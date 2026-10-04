/* TTD Analogy Engine v1 — visual attribute-transfer reasoning. */
const ATTRS=['shape','color','size'];
function diff(a,b){return ATTRS.filter(k=>a[k]!==b[k])}
function inferTransform(a,b){const changed=diff(a,b);if(!changed.length)return null;return{changed,transform:Object.fromEntries(changed.map(k=>[k,{from:a[k],to:b[k]}]))}}
function applyTransform(c,t){const out={...c};for(const k of t.changed)out[k]=t.transform[k].to;return out}
function solve(question){const{a,b,c,choices}=question,t=inferTransform(a,b);if(!t)return{status:'invalid',reason:'no_transformation'};const expected=applyTransform(c,t),matches=choices.map((x,i)=>JSON.stringify(x)===JSON.stringify(expected)?i:-1).filter(i=>i>=0);return{status:matches.length===1?'PASS':'AMBIGUOUS',answer:matches[0]??-1,expected,transform:t}}
module.exports={diff,inferTransform,applyTransform,solve};
