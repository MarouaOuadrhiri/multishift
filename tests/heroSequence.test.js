import test from 'node:test';
import assert from 'node:assert/strict';
import {sequenceFrame,CHAPTERS,FURNITURE_STEPS} from '../src/hooks/heroSequence.js';
test('entry stays centered and reaches an empty room before furnishing',()=>{
 assert.equal(sequenceFrame(0).exteriorOpacity,1);assert.equal(sequenceFrame(0).exteriorScale,1);
 assert.ok(sequenceFrame(.2).exteriorScale>1);
 for(const p of [.42,.45,.49,.53]){const f=sequenceFrame(p);assert.equal(f.exteriorOpacity,0);assert.equal(f.interiorScale,1);for(const piece of FURNITURE_STEPS)assert.equal(f[piece.key],0)}
});
test('each object completely lands before the next one starts',()=>{
 FURNITURE_STEPS.forEach((piece,index)=>{
  assert.equal(sequenceFrame(piece.start)[piece.key],0);assert.equal(sequenceFrame(piece.end)[piece.key],1);
  const mid=sequenceFrame((piece.start+piece.end)/2);assert.ok(mid[piece.key]>0&&mid[piece.key]<1);
  for(let previous=0;previous<index;previous++)assert.equal(mid[FURNITURE_STEPS[previous].key],1);
  for(let next=index+1;next<FURNITURE_STEPS.length;next++)assert.equal(mid[FURNITURE_STEPS[next].key],0);
 });
});
test('final room styling does not appear until all objects have landed',()=>{
 assert.equal(sequenceFrame(.92).furnitureFull,0);assert.equal(sequenceFrame(1).furnitureFull,1);
 for(const piece of FURNITURE_STEPS)assert.equal(sequenceFrame(.94)[piece.key],1);
});
test('all scroll values are finite, reversible and clamp at both ends',()=>{
 for(let n=0;n<=1000;n++)for(const value of Object.values(sequenceFrame(n/1000)))assert.ok(Number.isFinite(value));
 assert.deepEqual(sequenceFrame(-4),sequenceFrame(0));assert.deepEqual(sequenceFrame(4),sequenceFrame(1));
 assert.ok(sequenceFrame(.64).pieceSofa<sequenceFrame(.68).pieceSofa);
});
test('chapter navigation still lands in the corresponding stage',()=>CHAPTERS.forEach((p,i)=>assert.equal(sequenceFrame(p+.0001).phase,i)));
