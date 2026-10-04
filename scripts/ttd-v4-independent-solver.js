/* TTD v4 Independent Solver — derives next item from sequence data, not generator metadata. */
function eq(a,b){return JSON.stringify(a)===JSON.stringify(b)}
function period(values){for(let k=1;k<=Math.floor(values.length/2);k++){let ok=true;for(let i=0;i<values.length;i++)if(!eq(values[i],values[i%k])){ok=false;break}if(ok)return k}return null}
function solve(sequence){const n=sequence.length;if(n<2)return[];const candidates=[];const k=period(sequence);if(k)candidates.push({rule:`period_${k}`,answer:sequence[n%k]});for(const key of ['shape','color','size']){const vals=sequence.map(x=>x[key]);const vk=period(vals);if(vk)candidates.push({rule:`${key}_period_${vk}`,answer:{...sequence[n-1],[key]:vals[n%vk]}});}return candidates;}
function uniqueAnswers(candidates){const m=new Map();for(const c of candidates)m.set(JSON.stringify(c.answer),c.rule);return [...m.entries()].map(([answer,rule])=>({answer:JSON.parse(answer),rule}));}
if(typeof module!=='undefined')module.exports={solve,uniqueAnswers};
