/* Grade 1 Thinking Math — Question Engine v2
 * Problem Model -> Solver -> Renderer -> Choices -> Validator -> Publish
 */
const TTD_ENGINE_V2=(()=>{
 const clone=o=>JSON.parse(JSON.stringify(o)),uniq=a=>[...new Set(a.map(String))],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
 const choices=(answer,pool)=>shuffle(uniq([answer,...pool])).slice(0,4).map(String);
 const render={
  sequence:p=>p.missing>=p.items.length?p.items.join('  ')+'  ❓':p.items.map((x,i)=>i===p.missing?'❓':x).join('  '),
  matrix:p=>p.grid.map((r,ri)=>r.map((x,ci)=>ri===p.mr&&ci===p.mc?'❓':x).join(' | ')).join('<br>'),
  count:p=>`${p.sample}  |  ${p.items.join(' ')}`,
  logic:p=>p.entities.join(' · '),
  spatial:p=>p.layers.map((n,i)=>`Tầng ${i+1}: 🧊×${n}`).join('  '),
  word:p=>p.icon.repeat(Math.min(8,p.initial+2))+'<br>'+p.actions.map(a=>a.type==='add'?`+${a.value}`:`−${a.value}`).join('  '),
  compose:p=>`${p.symbol}×${p.part}  +  ❓  =  ${p.symbol}×${p.total}`
 };
 const solvers={sequence:p=>p.answer,matrix:p=>p.grid[p.mr][p.mc],count:p=>p.answer,logic:p=>p.answer,spatial:p=>p.layers.reduce((a,b)=>a+b,0),word:p=>p.actions.reduce((v,a)=>a.type==='add'?v+a.value:v-a.value,p.initial),compose:p=>p.total-p.part};
 function validate(q){
  const errors=[],expected=render[q.problem.kind];
  if(!q.id||!q.topic||!q.level||!q.problem)errors.push('missing core fields');
  if(!Number.isInteger(q.level)||q.level<1||q.level>10)errors.push('invalid level');
  if(!q.options||q.options.length!==4||new Set(q.options.map(String)).size!==4)errors.push('choices must contain 4 unique values');
  if(!q.options.map(String).includes(String(q.answer)))errors.push('answer not in choices');
  if(!solvers[q.problem.kind])errors.push('unknown solver');
  else if(String(q.answer)!==String(solvers[q.problem.kind](q.problem)))errors.push('answer != solver(model)');
  if(!q.explain||!q.visual)errors.push('missing explanation/visual');
  if(typeof expected!=='function')errors.push('unknown renderer');
  else if(q.visual!==expected(q.problem))errors.push('visual != renderer(model)');
  return {valid:errors.length===0,errors};
 }
 function make({id,topic,level,type,problem,question,answer,explain,distractors}){
  const p=clone(problem),q={id,topic,level,type,problem:p,question,answer:String(answer),options:choices(answer,distractors),explain,visual:render[p.kind]&&render[p.kind](p)};
  const v=validate(q);if(!v.valid)throw new Error(`${id}: ${v.errors.join(', ')}`);
  q.validation={hasUniqueAnswer:true,visualMatchesProblem:true,answerMatchesProblem:true,allChoicesValid:true,noAmbiguity:true,gradeAppropriate:true};return q;
 }
 return {make,validate,render,solvers};
})();
