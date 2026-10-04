/* TTD Spatial Reasoning Generator v1 — position and rotation candidates. */
const E=require('./ttd-spatial-engine');const DIR=['N','E','S','W'];
function candidate(i,level=1){const start=DIR[i%4],steps=level===1?1:level===2?2:3,answer=E.rotate(start,steps),choices=[answer,...DIR.filter(x=>x!==answer).slice(0,3)];return{family:level===1?'position_basic':level===2?'rotation_basic':'rotation_and_relation',level,question:{type:'spatial',start,direction:steps,choices},answer:0}}
function generate(n=100){return Array.from({length:n},(_,i)=>candidate(i,i%3+1))}
module.exports={candidate,generate};
