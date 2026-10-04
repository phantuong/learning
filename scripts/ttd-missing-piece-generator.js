/* TTD Missing Piece Generator v1. */
const E=require('./ttd-missing-piece-engine');const SH=['circle','square','triangle','star'],CO=['red','blue','green','yellow'];
function candidate(i,level=1){const base={shape:SH[i%4],color:CO[i%4],size:i%2?'large':'small',rotation:0};const target={...base};if(level>=1)target.shape=SH[(i+1)%4];if(level>=2)target.color=CO[(i+1)%4];if(level>=3)target.rotation=1;const choices=[target];for(let n=1;n<4;n++)choices.push({...target,shape:SH[(i+1+n)%4]});return{family:level===1?'simple_shape_completion':level===2?'attribute_completion':'multi_attribute_completion',level,question:{type:'missing_piece',base,target,choices},answer:0}}
function generate(n=100){return Array.from({length:n},(_,i)=>candidate(i,i%3+1))}
module.exports={candidate,generate};
