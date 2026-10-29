import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';

test('V2 renders every core route with complete source content and existing assets',async()=>{
 const vite=await createServer({server:{middlewareMode:true,watch:null,hmr:false},appType:'custom'});
 try{
  const {default:Site}=await vite.ssrLoadModule('/src/v2/V2Site.jsx');
  const {services,navigation,faq,company}=await vite.ssrLoadModule('/src/v2/content.js');
  const escape=s=>s.replaceAll('&','&amp;');
  const pages={};
  for(const [,path] of navigation){
   const html=renderToStaticMarkup(createElement(Site,{pathname:path}));pages[path]=html;
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path);
   assert.ok(html.includes(company.email),path);
   assert.ok(html.includes('Navigation de pied de page'),path);
   assert.doesNotMatch(html,/�|Ã©|Ã¨|â€™/);
   for(const [,asset] of html.matchAll(/src="(\/[^"]+)"/g))assert.ok(existsSync('public'+asset), JSON.stringify({asset,cwd:process.cwd(),url:new URL('../public'+asset,import.meta.url).href}));
   for(const [,href] of html.matchAll(/href="(\/[^"#?]*)[^"]*"/g))assert.ok(navigation.some(([,p])=>p===href)||existsSync('public'+href),href);
  }
  for(const service of services){
   assert.ok(pages['/services'].includes(escape(service.title)));
   for(const item of [...service.features,...service.deliverables])assert.ok(pages['/services'].includes(escape(item)),item);
   assert.ok(pages['/services'].includes(`id="${service.id}"`));
  }
  for(const item of faq)assert.ok(pages['/contact'].includes(escape(item.question)));
  for(const title of ['Cèdre de l’Atlas','Pigments Naturels','Métaux Forgés','La Main &amp; Le Ciseau'])assert.ok(pages['/savoir-faire'].includes(title),title);
  assert.match(pages['/portfolio'],/Villa Horizon/);
  assert.match(pages['/'],/v2-boutique-01.webp/);
  assert.match(renderToStaticMarkup(createElement(Site,{pathname:'/unknown'})),/404/);
 }finally{await vite.close()}
});
test('contact request encodes user content safely into an unsent email',async()=>{
 const vite=await createServer({server:{middlewareMode:true,watch:null,hmr:false},appType:'custom'});
 try{
  const {buildContactMail}=await vite.ssrLoadModule('/src/v2/contactMail.js');
  const uri=buildContactMail({name:'A & B',email:'client@example.com',phone:'+212123',service:'modelisation-3d',message:'Projet boutique & mobilier\nMeknès'});
  assert.ok(uri.startsWith('mailto:contact@multishift.ma?'));
  const params=new URLSearchParams(uri.split('?')[1]);
  assert.equal(params.get('subject'),'Demande de devis — Modélisation 3D');
  assert.ok(params.get('body').includes('A & B'));
  assert.ok(params.get('body').includes('Projet boutique & mobilier\nMeknès'));
 }finally{await vite.close()}
});



