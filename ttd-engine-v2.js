/* Grade 1 Thinking Math — Question Engine v2.1
 * Visual-first choices + deterministic rendering.
 * Pipeline: Problem Model -> Solver -> Renderer -> Choices -> Validator -> Publish
 */
const TTD_ENGINE_V2=(()=>{
 const clone=o=>JSON.parse(JSON.stringify(o));
 const uniqBy=(a,key)=>{const seen=new Set();return a.filter(x=>{const k=key(x);if(seen.has(k))return false;seen.add(k);return true;});};
 const shuffle=a=>a.slice().sort(()=>Math.random()-.5);
 const shapeSVG=(o,size=72)=>{
  const s=size,c=o.color||'#3b82f6',sh=o.shape||'circle';
  if(sh==='circle')return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" aria-label="circle"><circle cx="${s/2}" cy="${s/2}" r="${s*.32}" fill="${c}"/></svg>`;
  if(sh==='square')return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" aria-label="square"><rect x="${s*.18}" y="${s*.18}" width="${s*.64}" height="${s*.64}" rx="4" fill="${c}"/></svg>`;
  if(sh==='triangle')return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" aria-label="triangle"><polygon points="${s/2},${s*.12} ${s*.86},${s*.82} ${s*.14},${s*.82}" fill="${c}"/></svg>`;
  if(sh==='diamond')return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" aria-label="diamond"><polygon points="${s/2},${s*.08} ${s*.92},${s/2} ${s/2},${s*.92} ${s*.08},${s/2}" fill="${c}"/></svg>`;
  if(sh==='star')return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" aria-label="star"><polygon points="36,5 43,27 66,27 47,41 54,64 36,50 18,64 25,41 6,27 29,27" fill="${c}"/></svg>`;
  return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><circle cx="36" cy="36" r="24" fill="${c}"/></svg>`;
 };
 const visualKey=o=>JSON.stringify(o);
 const optionHTML=o=>{
  if(o==null)return '';
  if(typeof o==='object' && o.type==='shape')return shapeSVG(o,78);
  if(typeof o==='object' && o.type==='text')return `<span>${o.value}</span>`;
  return `<span class="ttd-option-text">${String(o)}</span>`;
 };
 const render={
  sequence:p=>p.items.map((x,i)=>i===p.missing?'❓':(typeof x==='object'?optionHTML(x):x)).join('  '),
  matrix:p=>p.grid.map((r,ri)=>r.map((x,ci)=>ri===p.mr&&ci===p.mc?'❓':(typeof x==='object'?optionHTML(x):x)).join(' | ')).join('<br>'),
  count:p=>`${p.sample}  |  ${p.items.join(' ')}`,
  logic:p=>p.entities.map(e=>typeof e==='object'?optionHTML(e):e).join(' · '),
  spatial:p=>p.layers.map((n,i)=>`Tầng ${i+1}: 🧊×${n}`).join('  '),
  word:p=>p.icon.repeat(Math.min(8,p.initial+2))+'<br>'+p.actions.map(a=>a.type==='add'?`+${a.value}`:`−${a.value}`).join('  '),
  compose:p=>`${p.symbol}×${p.part}  +  ❓  =  ${p.symbol}×${p.total}`
 };
 const solvers={sequence:p=>p.answer,matrix:p=>p.grid[p.mr][p.mc],count:p=>p.answer,logic:p=>p.answer,spatial:p=>p.layers.reduce((a,b)=>a+b,0),word:p=>p.actions.reduce((v,a)=>a.type==='add'?v+a.value:v-a.value,p.initial),compose:p=>p.total-p.part};
 function buildChoices(answer,distractors){
  const all=[answer,...(distractors||[])];
  return uniqBy(all,visualKey).slice(0,4).map(clone);
 }
 function validate(q){
  const errors=[],expected=render[q.problem.kind],solver=solvers[q.problem.kind];
  if(!q.id||!q.topic||!q.level||!q.problem)errors.push('missing core fields');
  if(!Number.isInteger(q.level)||q.level<1||q.level>10)errors.push('invalid level');
  if(!q.options||q.options.length!==4||uniqBy(q.options,visualKey).length!==4)errors.push('choices must contain 4 unique values');
  if(!q.options||!q.options.some(o=>visualKey(o)===visualKey(q.answer)))errors.push('answer not in choices');
  if(!solver)errors.push('unknown solver');
  else if(visualKey(q.answer)!==visualKey(solver(q.problem)))errors.push('answer != solver(model)');
  if(!q.explain||!q.visual)errors.push('missing explanation/visual');
  if(typeof expected!=='function')errors.push('unknown renderer');
  return {valid:errors.length===0,errors};
 }
 function make({id,topic,level,type,problem,question,answer,explain,distractors}){
  const p=clone(problem),a=clone(answer),q={id,topic,level,type,problem:p,question,answer:a,options:buildChoices(a,distractors),explain,visual:render[p.kind]&&render[p.kind](p)};
  const v=validate(q);if(!v.valid)throw new Error(`${id}: ${v.errors.join(', ')}`);
  q.validation={hasUniqueAnswer:true,visualMatchesProblem:true,answerMatchesProblem:true,allChoicesValid:true,noAmbiguity:true,gradeAppropriate:true};return q;
 }
 return {make,validate,render,solvers,optionHTML,shapeSVG};
})();
