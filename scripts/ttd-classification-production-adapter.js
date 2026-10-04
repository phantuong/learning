/* TTD Classification Production Adapter v1 — normalize classification questions into the shared production contract. */
const gate=require('./ttd-classification-quality-gate');
function normalize(q,index=0){const answer=typeof q.answer==='number'?q.answer:q.answer===true?0:1;return{id:q.id||`classification-${q.family}-${index+1}`,type:'classification',family:q.family,level:q.level,problem:q.question,choices:q.choices||[],answer,source:'classification-v1'}}
function validate(q){const n=normalize(q),r=gate.validate(q);return r.pass?{pass:true,question:n}:{pass:false,question:n,errors:r.errors}}
function batch(questions){const accepted=[],rejected=[];for(let i=0;i<questions.length;i++){const r=validate(questions[i]);(r.pass?accepted:rejected).push(r)}return{accepted,rejected,acceptedCount:accepted.length,rejectedCount:rejected.length,status:rejected.length?'REVIEW':'PASS'}}
module.exports={normalize,validate,batch};
