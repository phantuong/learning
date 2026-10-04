/* TTD Counting Hidden v2 — hidden/overlap/composite/cube visibility models */
(function(global){
 function countVisible(model){return (model.objects||[]).filter(o=>o.visible!==false).length}
 function countHidden(model){return (model.objects||[]).filter(o=>o.visible===false).length}
 function countLayers(model){return new Set((model.objects||[]).map(o=>o.layer||0)).size}
 function countComposite(model){return (model.components||[]).reduce((n,c)=>n+(c.count||1),0)}
 function countCubes(model){return (model.columns||[]).reduce((n,col)=>n+(col.heights||[]).reduce((a,h)=>a+h,0),0)}
 function solve(model){switch(model.type){case'hidden_objects':return countVisible(model);case'visible_plus_hidden':return countVisible(model)+countHidden(model);case'overlap_layers':return countLayers(model);case'composite_shapes':return countComposite(model);case'cube_stack_3d':return countCubes(model);default:return null}}
 function render(model,size=220){let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" width="${size}" height="${size}" role="img"><rect width="220" height="200" rx="16" fill="#f7f9fc"/>`;const o=model.objects||[];o.forEach((x,i)=>{if(x.visible===false)return;const px=x.x??30+(i%5)*38,py=x.y??35+Math.floor(i/5)*45,fill=x.color||'#3b82f6';if(x.type==='square')s+=`<rect x="${px}" y="${py}" width="28" height="28" rx="4" fill="${fill}"/>`;else if(x.type==='triangle')s+=`<path d="M${px+14} ${py}L${px+28} ${py+28}L${px} ${py+28}Z" fill="${fill}"/>`;else s+=`<circle cx="${px+14}" cy="${py+14}" r="14" fill="${fill}"/>`});if(model.type==='cube_stack_3d'){(model.columns||[]).forEach((col,i)=>{(col.heights||[]).forEach((h,j)=>{for(let k=0;k<h;k++){const x=28+i*45,y=160-k*25-j*3;s+=`<rect x="${x}" y="${y}" width="36" height="23" fill="#b9d7f5" stroke="#334155"/>`;}});});}return s+'</svg>'}
 global.TTD_COUNTING_HIDDEN_V2={solve,render};
})(window);
