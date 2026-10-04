/* TTD Question Bank Quality Gate v1 */
(function(global){
 const canonical=v=>JSON.stringify(v,(k,val)=>{if(val&&typeof val==='object'&&!Array.isArray(val))return Object.keys(val).sort().reduce((o,x)=>(o[x]=val[x],o),{});return val});
 function signature(q){return canonical({type:q.type,family:q.family,level:q.level,problem:q.problem,choices:q.choices})}
 function nearSignature(q){return canonical({type:q.type,family:q.family,problem:q.problem})}
 function inspect(bank){const exact=new Map(),near=new Map(),report={total:bank.length,accepted:0,rejected:0,exactDuplicates:[],nearDuplicates:[],invalid:[],byFamily:{},answerDistribution:{}};bank.forEach(q=>{report.byFamily[q.family]=(report.byFamily[q.family]||0)+1;report.answerDistribution[q.answer]=(report.answerDistribution[q.answer]||0)+1;const s=signature(q),n=nearSignature(q);if(exact.has(s))report.exactDuplicates.push([exact.get(s),q.id]);else exact.set(s,q.id);if(near.has(n))report.nearDuplicates.push([near.get(n),q.id]);else near.set(n,q.id);if(q.validation&&!q.validation.valid){report.invalid.push({id:q.id,errors:q.validation.errors||[]});report.rejected++}else report.accepted++});return report}
 global.TTD_QUALITY_GATE_V1={signature,nearSignature,inspect};
})(window);
