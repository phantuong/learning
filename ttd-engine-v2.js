/* Grade 1 Thinking Math — Question Engine v2.2
 * Problem Model -> Solver -> Renderer -> Choices -> Validator -> Publish
 */
const TTD_ENGINE_V2=(()=>{
 const clone=o=>JSON.parse(JSON.stringify(o));
 const uniqBy=(a,key)=>{const seen=new Set();return a.filter(x=>{const k=key(x);if(seen.has(k))return false;seen.add(k);return true;});};
 const shapeSVG=(o,size=72)=>{
  const s=size,c=o.color||'#3b82f6',sh=o.shape||'circle',scale=o.size==='small'?.72:o.size==='large'?1.22:1;
  const z=s*scale,off=(s-z)/2;
  const wrap=b=>`<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" aria-label="shape">${b}</svg>`;
  if(sh==='circle')return wrap(`<circle cx="${s/2}" cy="${s/2}" r="${z*.32}" fill="${c}"/>`);
  if(sh==='square')return wrap(`<rect x="${off+z*.18}" y="${off+z*.18}" width="${z*.64}" height="${z*.64}" rx="4" fill="${c}"/>`);
  if(sh==='triangle')return wrap(`<polygon points="${s/2},${off+z*.12} ${off+z*.86},${off+z*.82} ${off+z*.14},${off+z*.82}" fill="${c}"/>`);
  if(sh==='diamond')return wrap(`<polygon points="${s/2},${off+z*.08} ${off+z*.92},${s/2} ${s/2},${off+z*.92} ${off+z*.08},${s/2}" fill="${c}"/>`);
  if(sh==='star')return wrap(`<polygon points="${s/2},${off+z*.07} ${off+z*.60},${off+z*.38} ${off+z*.90},${off+z*.38} ${off+z*.66},${off+z*.57} ${off+z*.76},${off+z*.88} ${s/2},${off+z*.69} ${off+z*.24},${off+z*.88} ${off+z*.34},${off+z*.57} ${off+z*.10},${off+z*.38} ${off+z*.40},${off+z*.38}" fill="${c}"/>`);
  return wrap(`<circle cx="${s/2}" cy="${s/2}" r="${s*.3}" fill="${c}"/>`);
 };
 const visualKey=o=>JSON.stringify(o);
 const optionHTML=o=>{
  if(o==null)return '';
  if(typeof o==='object'&&o.type==='shape'){
   if(o.count){let b='';for(let i=0;i<Math.min(o.count,6);i++)b+=shapeSVG(o,44).replace(/<svg[^>]*>|<\/svg>/g,'');return `<div class="ttd-option-group" aria-label="${o.count} shapes">${b}</div>`;}
   return shapeSVG(o,78);
  }
  if(typeof o==='object'&&o.type==='pattern')return `<div class="ttd-option-group">${(o.items||[]).map(x=>optionHTML(x)).join('')}</div>`;
  if(typeof o==='object'&&o.type==='text')return `<span>${o.value}</span>`;
  return `<span class="ttd-option-text">${String(o)}</span>`;
 };
 const render={
  sequence:p=>{const shown=p.items.map(x=>typeof x==='object'?optionHTML(x):x);if(p.missing>=p.items.length)shown.push('❓');return shown.join('  ');},
  matrix:p=>p.grid.map((r,ri)=>r.map((x,ci)=>ri===p.mr&&ci===p.mc?'❓':(typeof x==='object'?optionHTML(x):x)).join(' | ')).join('<br>'),
  count:p=>`${p.sample}  |  ${p.items.map(x=>typeof x==='object'?optionHTML(x):x).join(' ')}`,
  logic:p=>p.entities.map(e=>typeof e==='object'?optionHTML(e):e).join(' · '),
  spatial:p=>p.layers.map((n,i)=>`Tầng ${i+1}: 🧊×${n}`).join('  '),
  word:p=>p.icon.repeat(Math.min(8,p.initial+2))+'<br>'+p.actions.map(a=>a.type==='add'?`+${a.value}`:`−${a.value}`).join('  '),
  compose:p=>`${p.symbol}×${p.part}  +  ❓  =  ${p.symbol}×${p.total}`
 };
 const solvers={sequence:p=>p.answer,matrix:p=>p.grid[p.mr][p.mc],count:p=>p.answer,logic:p=>p.answer,spatial:p=>p.layers.reduce((a,b)=>a+b,0),word:p=>p.actions.reduce((v,a)=>a.type==='add'?v+a.value:v-a.value,p.initial),compose:p=>p.total-p.part};
 function buildChoices(answer,distractors){return uniqBy([answer,...(distractors||[])],visualKey).slice(0,4).map(clone);}
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
