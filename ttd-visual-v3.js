/* Grade 1 Thinking Math — Visual Renderer v3
 * Deterministic SVG primitives for matrix, composition and counting tasks.
 */
const TTD_VISUAL_V3=(()=>{
 const esc=s=>String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
 const colors={red:'#ef4444',blue:'#3b82f6',green:'#22c55e',yellow:'#eab308',orange:'#f97316',purple:'#8b5cf6',gray:'#94a3b8'};
 function shape(type,cx,cy,size=24,color='blue',stroke='#334155'){
  const fill=colors[color]||color||'#3b82f6';
  if(type==='circle')return `<circle cx="${cx}" cy="${cy}" r="${size/2}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  if(type==='triangle')return `<polygon points="${cx},${cy-size/2} ${cx-size/2},${cy+size/2} ${cx+size/2},${cy+size/2}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  if(type==='diamond')return `<polygon points="${cx},${cy-size/2} ${cx+size/2},${cy} ${cx},${cy+size/2} ${cx-size/2},${cy}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  return `<rect x="${cx-size/2}" y="${cy-size/2}" width="${size}" height="${size}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
 }
 const svg=(w,h,b)=>`<svg class="ttd-svg" viewBox="0 0 ${w} ${h}" role="img">${b}</svg>`;
 function matrix(p){
  const rows=p.grid.length,cols=p.grid[0].length,cell=58,w=cols*cell,h=rows*cell,b=[];
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
   const x=c*cell,y=r*cell,miss=r===p.mr&&c===p.mc;
   b.push(`<rect x="${x+2}" y="${y+2}" width="${cell-4}" height="${cell-4}" rx="8" fill="${miss?'#f8fafc':'white'}" stroke="#64748b" stroke-width="2"/>`);
   if(miss)b.push(`<text x="${x+cell/2}" y="${y+cell/2+10}" text-anchor="middle" font-size="28">?</text>`);else b.push(`<text x="${x+cell/2}" y="${y+cell/2+10}" text-anchor="middle" font-size="26" font-weight="700">${esc(p.grid[r][c])}</text>`);
  }
  return svg(w,h,b.join(''));
 }
 function composition(p){
  const n=p.total,part=p.part,missing=n-part,cols=Math.min(6,n),cell=44,b=[];
  for(let i=0;i<n;i++){
   const x=(i%cols)*cell+24,y=Math.floor(i/cols)*cell+24;
   b.push(shape(p.shape||'square',x,y,30,p.color||'blue'));
  }
  for(let i=0;i<part;i++){
   const x=(i%cols)*cell+24,y=Math.floor(i/cols)*cell+24;
   b.push(`<circle cx="${x}" cy="${y}" r="4" fill="white"/>`);
  }
  const rows=Math.ceil(n/cols),w=cols*cell,h=rows*cell;
  return svg(w,h,b.join(''));
 }
 function counting(p){
  const items=p.items||[],cols=Math.min(5,Math.max(1,items.length)),cell=54,b=[];
  items.forEach((it,i)=>{const x=i%cols*cell+27,y=Math.floor(i/cols)*cell+27;const type=typeof it==='string'?it:(it.shape||'circle');const color=typeof it==='object'?it.color:'blue';b.push(shape(type,x,y,30,color));});
  return svg(cols*cell,Math.ceil(items.length/cols)*cell,b.join(''));
 }
 function choice(option){
  if(typeof option==='string')return `<span class="ttd-text-choice">${esc(option)}</span>`;
  if(option.type==='shape')return svg(70,70,shape(option.shape||'circle',35,35,34,option.color||'blue'));
  if(option.type==='pattern')return svg(140,70,(option.items||[]).map((x,i)=>shape(x.shape||'circle',20+i*32,35,24,x.color||'blue')).join(''));
  return `<span>${esc(option.label||'')}</span>`;
 }
 return {shape,matrix,composition,counting,choice};
})();
