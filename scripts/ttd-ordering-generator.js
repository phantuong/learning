/* TTD Ordering & Comparison Generator v1. */
const E=require('./ttd-ordering-engine');
function candidate(i,level=1){const items=[1,2,3,4].map(n=>({id:n,value:((n+i)%4)+1}));const sorted=E.sortItems(items,x=>x.value);return{family:level===1?'size_order':level===2?'multi_item_order':'conditional_order',level,question:{type:'ordering',items,choices:sorted.map(x=>x.id)},answer:0}}
function generate(n=100){return Array.from({length:n},(_,i)=>candidate(i,i%3+1))}
module.exports={candidate,generate};
