/* TTD v4 Advanced Solver — independent inference for AABB and attribute-cycle patterns. */
function eq(a,b){return JSON.stringify(a)===JSON.stringify(b)}
function cycle(vals){for(let k=1;k<=Math.floor(vals.length/2);k++){let ok=true;for(let i=0;i<vals.length;i++)if(!eq(vals[i],vals[i%k])){ok=false;break}if(ok)return k}return null}
function infer(sequence){if(sequence.length<3)return[];const out=[];const n=sequence.length;const p=cycle(sequence);if(p)out.push({rule:`object_cycle_${p}`,answer:sequence[n%p]});for(const key of ['shape','color','size']){const vals=sequence.map(x=>x[key]),p=cycle(vals);if(p){const next=vals[n%p];out.push({rule:`${key}_cycle_${p}`,answer:{...sequence[n-1],[key]:next}});}}if(n>=4&&eq(sequence[0],sequence[1])&&eq(sequence[2],sequence[3]))out.push({rule:'AABB',answer:sequence[0]});if(n>=4&&eq(sequence[0],sequence[3])&&eq(sequence[1],sequence[2]))out.push({rule:'ABBA',answer:sequence[0]});return out;}
function unique(c){const m=new Map();for(const x of c)m.set(JSON.stringify(x.answer),x.rule);return [...m].map(([answer,rule])=>({answer:JSON.parse(answer),rule}));}
if(typeof module!=='undefined')module.exports={infer,unique};
