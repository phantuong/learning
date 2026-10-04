/* TTD Shape Renderer v1 — deterministic SVG from visual model */
(function(global){
 const NS='http://www.w3.org/2000/svg';
 function el(tag,a={}){const n=document.createElementNS(NS,tag);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));return n}
 const colors={red:'#ef4444',blue:'#3b82f6',green:'#22c55e',yellow:'#eab308'};
 function render(model,size=96){const svg=el('svg',{viewBox:'0 0 96 96',width:size,height:size,'aria-label':`${model.color} ${model.shape}`});const g=el('g',{transform:'translate(48 48)'});const fill=colors[model.color]||'#64748b',r=model.size==='large'?30:20;
  if(model.shape==='circle')g.appendChild(el('circle',{cx:0,cy:0,r,fill}));
  else if(model.shape==='square')g.appendChild(el('rect',{x:-r,y:-r,width:r*2,height:r*2,rx:6,fill}));
  else if(model.shape==='triangle')g.appendChild(el('polygon',{points:`0,-${r} ${r},${r} -${r},${r}`,fill}));
  else if(model.shape==='star'){let p='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r:r*0.45;p+=`${Math.cos(a)*rr},${Math.sin(a)*rr} `}g.appendChild(el('polygon',{points:p,fill}))}
  else g.appendChild(el('circle',{cx:0,cy:0,r,fill}));svg.appendChild(g);return svg}
 function renderChoices(q,target){if(!target)return;target.innerHTML='';(q.visual&&q.visual.choiceVisuals||q.choices||[]).forEach((m,i)=>{const card=document.createElement('button');card.type='button';card.dataset.index=i;card.className='ttd-shape-choice';card.appendChild(render(m));target.appendChild(card)})}
 global.TTD_SHAPE_RENDERER_V1={render,renderChoices};
})(window);
