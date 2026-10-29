export const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => {const t=clamp(value);return t*t*(3-2*t)};
const range = (p,start,end)=>smooth((p-start)/(end-start));
const drop = (p,start,end)=>{const t=clamp((p-start)/(end-start));return 1-Math.pow(1-t,3)};
export const CHAPTERS=[0,.2,.41,.54];
export const FURNITURE_STEPS=[
 {key:'piecePendant',name:'pendant',start:.54,end:.60},
 {key:'pieceSofa',name:'sofa',start:.62,end:.68},
 {key:'pieceTable',name:'table',start:.70,end:.76},
 {key:'pieceChair',name:'chair',start:.78,end:.84},
 {key:'pieceTree',name:'tree',start:.86,end:.92},
];
export function sequenceFrame(progress){
 const p=clamp(progress),enter=range(p,.07,.40);
 return {
  enter,
  exteriorOpacity:1-range(p,.31,.41),
  exteriorScale:1+enter*1.65,
  interiorScale:1.04-range(p,.28,.42)*.04,
  ...Object.fromEntries(FURNITURE_STEPS.map(step=>[step.key,drop(p,step.start,step.end)])),
  furnitureFull:range(p,.94,.985),
  welcomeOpacity:1-range(p,.03,.19),
  finalOpacity:range(p,.96,1),
  phase:p<.2?0:p<.41?1:p<.54?2:3,
 };
}
