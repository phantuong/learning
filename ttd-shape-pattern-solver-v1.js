/* TTD Shape Pattern Solver v1 — independent answer derivation */
(function(global){
 const eq=(a,b)=>a&&b&&a.shape===b.shape&&a.color===b.color&&a.size===b.size;
 function solve(q){const p=q.problem||{},s=p.sequence||[],rule=p.rule;if(!s.length)return{valid:false,reason:'empty_sequence'};let expected=null;
  if(rule==='AB')expected=s[s.length%2];
  else if(rule==='ABC')expected=s[s.length%3];
  else if(rule==='AAB')expected=s[s.length%3];
  else if(rule==='ABB')expected=s[s.length%3];
  else if(rule==='AABB')expected=s[s.length%4];
  else if(rule==='SIZE_ALT'){const x=s[s.length%2];expected={...x,size:x.size==='small'?'large':'small'};}
  else if(rule==='COLOR_ALT'){const colors=[];s.forEach(x=>{if(!colors.includes(x.color))colors.push(x.color)});const last=s[s.length-1];expected={...last,color:colors[colors.length%Math.max(colors.length,1)]};}
  else if(rule==='SHAPE_COLOR_GRID'){const shapes=[],colors=[];s.forEach(x=>{if(!shapes.includes(x.shape))shapes.push(x.shape);if(!colors.includes(x.color))colors.push(x.color)});expected={shape:shapes[s.length%shapes.length],color:colors[Math.floor(s.length/shapes.length)%colors.length],size:s[0].size};}
  else return{valid:false,reason:'unsupported_rule',rule};
  const idx=(q.choices||[]).findIndex(x=>eq(x,expected));return{valid:idx>=0,expected,choiceIndex:idx,reason:idx>=0?'ok':'expected_choice_missing'};
 }
 function validate(q){const solved=solve(q);return{...solved,generatedAnswer:q.answer,answerMatches:solved.choiceIndex===q.answer,valid:solved.valid&&solved.choiceIndex===q.answer};}
 global.TTD_SHAPE_PATTERN_SOLVER_V1={solve,validate};
})(window);
