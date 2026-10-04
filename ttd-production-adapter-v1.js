/* TTD Production Adapter v1 — canonicalizes generated questions before UI use. */
(function(global){
 function toProductionQuestion(q){
  const raw=q.choices||[]; const answerIndex=Number.isInteger(q.answer)?q.answer:0;
  if(raw.length!==4||answerIndex<0||answerIndex>=raw.length)throw new Error(`invalid_question:${q.id||'unknown'}`);
  const choices=raw.map((visual,i)=>({id:`${q.id}-choice-${i}`,visual,isCorrect:i===answerIndex,misconception:null}));
  return {...q,choices,answerId:choices[answerIndex].id,answer:undefined};
 }
 function validateProduction(q){const cs=q.choices||[],correct=cs.filter(c=>c.isCorrect);return{valid:cs.length===4&&correct.length===1&&!!q.answerId&&cs.some(c=>c.id===q.answerId)&&cs.every(c=>!!c.visual),visualChoices:cs.every(c=>typeof c.visual==='object')};}
 global.TTD_PRODUCTION_ADAPTER_V1={toProductionQuestion,validateProduction};
})(window);
