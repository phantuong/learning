/* TTD Distractor Generator v1 — plausible misconception-based visual choices */
function makeDistractors(q){const s=q.problem.sequence||[],answer=q.choices[q.answer],out=[],last=s[s.length-1];const add=(reason,x)=>{if(!x||JSON.stringify(x)===JSON.stringify(answer)||out.some(d=>JSON.stringify(d.visual)===JSON.stringify(x)))return;out.push({visual:x,reason});};
if(q.family==='SIZE_ALT'){add('ignores_size',{...answer,size:answer.size==='small'?'large':'small'});add('repeats_previous',{...last,size:answer.size});}
if(q.family==='COLOR_ALT'){add('ignores_color',{...answer,color:last.color});add('uses_previous_color',{...answer,color:s.length>1?s[s.length-2].color:last.color});}
if(q.family==='SHAPE_COLOR_GRID'){add('follows_shape_only',{...answer,color:last.color});add('follows_color_only',{...answer,shape:last.shape});}
if(['AB','ABC','AAB','ABB','AABB'].includes(q.family)){add('repeats_previous',{...last});add('changes_one_attribute',{...answer,color:last.color});}
const pool=[['circle','red','small'],['square','blue','small'],['triangle','green','small'],['star','yellow','small'],['circle','blue','large'],['square','red','large']];for(const [shape,color,size] of pool)if(out.length<3)add('alternative_pattern',{shape,color,size});return out.slice(0,3);}
function validate(q){const d=makeDistractors(q);const distinct=new Set(d.map(x=>JSON.stringify(x.visual))).size===3;return{valid:d.length===3&&distinct,distinct,distractors:d};}
if(typeof module!=='undefined')module.exports={makeDistractors,validate};
