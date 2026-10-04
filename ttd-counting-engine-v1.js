/* TTD Counting Engine v1 — model-first counting, overlap and cube stacks */
(function(global){
 function visibleObjects(model){return (model.objects||[]).filter(o=>o.visible!==false)}
 function countObjects(model){return visibleObjects(model).length}
 function countByType(model,type){return visibleObjects(model).filter(o=>o.type===type).length}
 function countUniqueLayers(model){return new Set(visibleObjects(model).map(o=>o.layer||0)).size}
 function cubeStackCount(model){return (model.heights||[]).reduce((s,n)=>s+Math.max(0,n),0)}
 function countOverlappingShapes(model){return (model.shapes||[]).reduce((sum,s)=>sum+(s.count||1),0)}
 function solve(model){switch(model.type){case'objects':return countObjects(model);case'by_type':return countByType(model,model.targetType);case'layers':return countUniqueLayers(model);case'cube_stack':return cubeStackCount(model);case'overlap':return countOverlappingShapes(model);default:return null}}
 function render(model,size=180){let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="${size}" height="${size}"><rect width="180" height="180" rx="16" fill="#f7f9fc"/>`;const objs=visibleObjects(model);objs.forEach((o,i)=>{const x=o.x??30+(i%4)*38,y=o.y??40+Math.floor(i/4)*45,c=o.color||'#3b82f6';if(o.type==='square')s+=`<rect x="${x}" y="${y}" width="24" height="24" rx="4" fill="${c}"/>`;else if(o.type==='triangle')s+=`<path d="M${x+12} ${y}L${x+24} ${y+24}L${x} ${y+24}Z" fill="${c}"/>`;else s+=`<circle cx="${x+12}" cy="${y+12}" r="12" fill="${c}"/>`});if(model.type==='cube_stack'){for(let i=0;i<(model.heights||[]).length;i++)for(let j=0;j<model.heights[i];j++)s+=`<rect x="${30+i*42}" y="${145-j*30}" width="34" height="28" fill="#9ec5ff" stroke="#334155"/>`;}return s+'</svg>'}
 global.TTD_COUNTING_V1={solve,render,countObjects,countByType,countUniqueLayers,cubeStackCount,countOverlappingShapes};
})(window);
