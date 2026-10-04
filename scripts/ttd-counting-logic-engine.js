/* TTD Counting & Logic Engine v1 — count, change, and relational logic. */
function count(items,predicate=()=>true){return items.filter(predicate).length}
function solveChange(start,change){return start+change}
function solveRelation(a,relation,b){if(relation==='greater')return a>b;if(relation==='less')return a<b;if(relation==='equal')return a===b;throw Error('unsupported relation')}
module.exports={count,solveChange,solveRelation};
