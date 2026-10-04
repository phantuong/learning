// Production content manifest / runtime QA.
(function(){
const GROUPS=['pattern','classification','analogy','matrix','spatial','counting','ordering','missing'];
function validateQuestion(q){
 if(!q||typeof q!=='object')return 'question is not an object';
 if(!q.id||!q.group||![1,2,3].includes(q.level))return 'missing id/group/level';
 if(!GROUPS.includes(q.group))return 'unknown group';
 if(!Array.isArray(q.choices)||q.choices.length<2)return 'not enough choices';
 if(!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.choices.length)return 'invalid answer index';
 if(q.visual===undefined)return 'missing visual';
 return null;
}
function build(){const banks=[window.TTD_QUESTION_BANK?.questions||[],window.TTD_QUESTION_BANK_EXTRA?.questions||[],window.TTD_QUESTION_BANK_PRODUCTION?.questions||[],window.TTD_STRUCTURED_VISUAL_BANK?.questions||[]];const all=banks.flat(),errors=[],seen=new Set(),counts={};all.forEach(q=>{const e=validateQuestion(q);if(e)errors.push(`${q?.id||'<unknown>'}: ${e}`);if(q?.id){if(seen.has(q.id))errors.push(`${q.id}: duplicate id`);seen.add(q.id);const k=`${q.group}:${q.level}`;counts[k]=(counts[k]||0)+1}});return{total:all.length,errors,counts,groups:GROUPS}}window.TTD_CONTENT_MANIFEST={validateQuestion,build}})();
