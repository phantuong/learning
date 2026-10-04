/* TTD Matrix Pattern Validator v4 */
(function(global){
 function sig(x){return JSON.stringify(x)}
 function valid3(grid){return Array.isArray(grid)&&grid.length===3&&grid.every(r=>Array.isArray(r)&&r.length===3)}
 function validate(q){
   const e=[]; if(!valid3(q.problem.grid))e.push('not_3x3');
   if(!Array.isArray(q.choices)||q.choices.length!==4)e.push('must_have_4_choices');
   if(q.answer<0||q.answer>=q.choices.length)e.push('invalid_answer_index');
   if(new Set(q.choices.map(sig)).size!==q.choices.length)e.push('duplicate_choices');
   const expected=solve(q); if(!expected)e.push('pattern_solver_failed'); else if(sig(q.choices[q.answer])!==sig(expected))e.push('answer_does_not_match_pattern');
   return {valid:e.length===0,errors:e,expected};
 }
 function solve(q){const g=q.problem.grid,p=q.problem.pattern;
   if(p==='missing_center') return g[0][2]&&g[1][0]&&g[1][2]&&g[2][1] ? {...g[0][2],color:g[1][1]?.color||g[1][0].color}:null;
   if(p==='missing_corner') return g[1][2]&&g[2][1] ? {...g[1][0],color:g[2][1].color}:null;
   if(p==='combine_two_cells'){const a=g[0][0],b=g[0][1];return {shape:a.shape,color:b.color,count:(a.count||1)+(b.count||1)};}
   return null;
 }
 global.TTD_MATRIX_PATTERN_VALIDATOR_V4={validate,validateBank:b=>b.map(q=>({...q,validation:validate(q)}))};
})(window);
