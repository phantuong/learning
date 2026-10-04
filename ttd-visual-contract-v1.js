/* TTD Visual Contract v1 — visual must be deterministically derived from the problem model */
(function(global){
 function canonical(v){if(Array.isArray(v))return v.map(canonical);if(v&&typeof v==='object')return Object.keys(v).sort().reduce((o,k)=>(o[k]=canonical(v[k]),o),{});return v}
 function stable(v){return JSON.stringify(canonical(v))}
 function validate(q){const errors=[];if(!q||!q.problem)errors.push('missing_problem_model');if(!q.visual)errors.push('missing_visual_model');if(q.visual&&q.visual.sourceHash&&q.visual.sourceHash!==stable(q.problem))errors.push('visual_source_mismatch');if(q.visual&&q.visual.renderedChoices&&q.choices&&q.visual.renderedChoices.length!==q.choices.length)errors.push('visual_choice_count_mismatch');if(q.visual&&q.visual.answerVisualId&&q.visual.choiceVisualIds&&q.visual.choiceVisualIds[q.answer]!==q.visual.answerVisualId)errors.push('answer_visual_mismatch');return{valid:errors.length===0,errors}}
 function attach(q,visual){q.visual=Object.assign({},visual,{sourceHash:stable(q.problem)});return q}
 global.TTD_VISUAL_CONTRACT_V1={canonical,stable,validate,attach};
})(window);
