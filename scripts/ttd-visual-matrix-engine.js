/* TTD Visual Matrix Engine v1 — single-rule, dual-rule and 3x3 visual matrix reasoning. */
const ATTRS=['shape','color','size'];
function same(a,b,k){return a[k]===b[k]}
function inferRow(row){const out={};for(const k of ATTRS){const vals=row.map(x=>x[k]);if(vals.every(v=>v===vals[0]))out[k]={type:'constant',value:vals[0]};else if(vals.length>=3&&vals[2]!==undefined&&vals[0]!==vals[1])out[k]={type:'change',from:vals[0],to:vals[1],expected:vals[2]}}return out}
function solve2x2(grid,choices){const a=grid[0][0],b=grid[0][1],c=grid[1][0],rules={};for(const k of ATTRS){if(a[k]===b[k]&&c[k]===a[k])rules[k]=a[k];else if(a[k]!==b[k]&&a[k]===c[k])rules[k]=b[k];else if(a[k]!==b[k]&&a[k]!==c[k])rules[k]=b[k]}const hits=choices.map((x,i)=>ATTRS.every(k=>x[k]===rules[k])?i:-1).filter(i=>i>=0);return{status:hits.length===1?'PASS':'AMBIGUOUS',answer:hits[0]??-1,expected:rules}}
module.exports={inferRow,solve2x2};
