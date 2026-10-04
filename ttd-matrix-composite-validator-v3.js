/* TTD Matrix Composite Validator v3 */
(function(global){
  function validate(q){
    const e=[]; if(!q.problem||q.problem.grid.length!==3||q.problem.grid.some(r=>r.length!==3))e.push('not_3x3');
    if((q.choices||[]).length!==4)e.push('must_have_4_choices');
    if(q.answer<0||q.answer>=q.choices.length)e.push('invalid_answer_index');
    const result=global.TTD_MATRIX_V3.solve3x3(q.problem.grid,q.problem.rowRule,q.problem.colRule,q.problem.options||{});
    if(!result)e.push('solver_cannot_solve'); else if(!result.consistent)e.push('row_column_conflict'); else if(JSON.stringify(q.choices[q.answer])!==JSON.stringify(result.candidate))e.push('answer_does_not_match_solver');
    const sig=q.choices.map(x=>JSON.stringify(x));if(new Set(sig).size!==sig.length)e.push('duplicate_choices');
    return {valid:e.length===0,errors:e,solver:result};
  }
  global.TTD_MATRIX_COMPOSITE_VALIDATOR_V3={validate,validateBank:b=>b.map(q=>({...q,validation:validate(q)}))};
})(window);
