/* TTD Missing Piece Engine v1. */
function diffAttributes(a,b){return ['shape','color','size','rotation'].filter(k=>a[k]!==b[k])}
function solveCompletion(base,target,choices){const missing=diffAttributes(base,target);const hits=choices.map((x,i)=>missing.every(k=>x[k]===target[k])?i:-1).filter(i=>i>=0);return{status:hits.length===1?'PASS':'AMBIGUOUS',answer:hits[0]??-1,missing}}
module.exports={diffAttributes,solveCompletion};
