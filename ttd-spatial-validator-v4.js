/* TTD Spatial Validator v4 — semantic and visual uniqueness checks */
(function(global){
  function canonical(cubes,view){
    const p=global.TTD_SPATIAL_VIEW_V2.project(cubes,view); return p.map(x=>`${x.a},${x.b}:${x.h}`).join('|');
  }
  function validate(question){
    const choices=question.choices||[]; const errors=[]; const signatures=[];
    if(choices.length!==4) errors.push('must_have_4_choices');
    choices.forEach((c,i)=>{
      if(!c.cubes||!Array.isArray(c.cubes)||!c.view) errors.push(`choice_${i}_invalid_model`);
      else signatures.push(canonical(c.cubes,c.view));
    });
    const dup=new Set(signatures); if(dup.size!==signatures.length) errors.push('duplicate_visual_choices');
    if(question.answer<0||question.answer>=choices.length) errors.push('invalid_answer_index');
    const correct=choices[question.answer];
    if(correct){
      const correctSig=canonical(correct.cubes,correct.view);
      choices.forEach((c,i)=>{if(i!==question.answer&&canonical(c.cubes,c.view)===correctSig) errors.push(`choice_${i}_same_as_correct`);});
    }
    return {valid:errors.length===0,errors,choiceCount:choices.length,uniqueVisuals:dup.size};
  }
  function validateBank(bank){return bank.map(q=>({...q,validation:validate(q)}));}
  global.TTD_SPATIAL_VALIDATOR_V4={validate,validateBank};
})(window);
