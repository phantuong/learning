/* TTD Ordering & Comparison Engine v1. */
function compare(a,b){return a<b?-1:a>b?1:0}
function sortItems(items,key=x=>x){return [...items].sort((a,b)=>compare(key(a),key(b)))}
function solveConditional(items,conditions){return conditions.reduce((arr,c)=>c.before?arr:arr,items)}
module.exports={compare,sortItems,solveConditional};
