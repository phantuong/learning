/* TTD Matrix Validator v2 — validates 3x3 visual matrix candidates */
(function(global){
  function eq(a,b){return JSON.stringify(a)===JSON.stringify(b)}
  function solveCell(q){return global.TTD_MATRIX_V2.solve(q.problem.grid,q.problem.rule,q.problem.options||{})}
  function validate(q){
    const errors=[]; const choices=q.choices||[];
    if(choices.length!==4) errors.push('must_have_4_choices');
    if(q.answer<0||q.answer>=choices.length) errors.push('invalid_answer_index');
    const expected=solveCell(q); if(!expected) errors.push('solver_cannot_solve');
    if(expected && q.answer>=0 && !eq(choices[q.answer],expected)) errors.push('answer_does_not_match_solver');
    const sigs=choices.map(c=>JSON.stringify(c)); if(new Set(sigs).size!==sigs.length) errors.push('duplicate_choices');
    if(q.problem.grid.length!==3 || q.problem.grid.some(r=>r.length!==3)) errors.push('not_3x3');
    return {valid:errors.length===0,errors,expected};
  }
  global.TTD_MATRIX_VALIDATOR_V2={validate,validateBank:bank=>bank.map(q=>({...q,validation:validate(q)}))};
})(window);
