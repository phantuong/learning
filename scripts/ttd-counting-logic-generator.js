/* TTD Counting & Logic Generator v1 — visual counting candidates. */
const E=require('./ttd-counting-logic-engine');
function candidate(i,level=1){const start=(i%5)+1,change=level===1?0:level===2?1:-1,expected=E.solveChange(start,change);const choices=[expected,expected+1,Math.max(0,expected-1),expected+2];return{family:level===1?'count_match':level===2?'count_change':'count_relation',level,question:{type:'counting',items:Array.from({length:start},(_,n)=>({id:n})),change,choices},answer:0}}
function generate(n=100){return Array.from({length:n},(_,i)=>candidate(i,i%3+1))}
module.exports={candidate,generate};
