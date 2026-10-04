/* TTD Engine v3 integration adapters */
(function(global){
  function spatial(model){ return global.TTD_SPATIAL_V1.solve(model); }
  function matrix(model){ return global.TTD_MATRIX_V1.solve(model.grid); }
  function composition(model){ return global.TTD_COMPOSITION_V1.solve(model); }
  function validate(model,answer){
    const checks={hasModel:!!model,typeKnown:['spatial','matrix','composition'].includes(model.type),hasAnswer:answer!==null&&answer!==undefined};
    if(model.type==='spatial') checks.answerMatchesModel=answer===spatial(model);
    if(model.type==='matrix') checks.answerMatchesModel=answer===matrix(model);
    if(model.type==='composition') checks.answerMatchesModel=JSON.stringify(answer)===JSON.stringify(composition(model));
    checks.valid=Object.values(checks).every(Boolean); return checks;
  }
  global.TTD_ENGINE_V3={solve(model){ if(model.type==='spatial') return spatial(model); if(model.type==='matrix') return matrix(model); if(model.type==='composition') return composition(model); return null; },validate};
})(window);
