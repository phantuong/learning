/* TTD Shape Difficulty v1 — structural difficulty scoring */
function score(q){const p=q.problem||{},s=p.sequence||[];const attrs=new Set();s.forEach(x=>{attrs.add(`shape:${x.shape}`);attrs.add(`color:${x.color}`);attrs.add(`size:${x.size}`)});let score=0;const rule=p.rule||q.family;if(rule==='AB')score=1;if(rule==='AAB'||rule==='ABB')score=2;if(rule==='ABC'||rule==='AABB')score=3;if(rule==='SIZE_ALT'||rule==='COLOR_ALT')score=4;if(rule==='SHAPE_COLOR_GRID')score=5;if(attrs.size>=6)score+=1;if(s.length>=6)score+=1;if((p.parameters?.step||1)>1)score+=1;return Math.min(5,score)}
function validate(q){const actual=score(q);return{valid:actual===q.level,expectedLevel:actual,declaredLevel:q.level};}
if(typeof module!=='undefined')module.exports={score,validate};
