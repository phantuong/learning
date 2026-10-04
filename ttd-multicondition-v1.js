/* TTD Multi-Condition Logic v1 — model-first constraint reasoning */
(function(global){
 const COLORS=['red','blue','green','yellow']; const SHAPES=['circle','square','triangle','star']; const POS=['top','middle','bottom'];
 function matches(o,c){return Object.keys(c).every(k=>o[k]===c[k]);}
 function solve(model){const candidates=model.objects||[];const valid=candidates.filter(o=>(model.conditions||[]).every(c=>matches(o,c)));return valid.length===1?valid[0]:null;}
 function choiceSignature(o){return JSON.stringify({shape:o.shape,color:o.color,position:o.position,count:o.count});}
 function render(o,size=120){if(!o)return '<svg viewBox="0 0 120 120" width="120" height="120"><rect width="120" height="120" rx="14" fill="#f7f9fc"/><text x="60" y="70" text-anchor="middle" font-size="36">?</text></svg>';const color=o.color==='red'?'#ef4444':o.color==='blue'?'#3b82f6':o.color==='green'?'#22c55e':'#eab308';const y=o.position==='top'?25:o.position==='bottom'?90:60;let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}"><rect width="120" height="120" rx="14" fill="#f7f9fc"/>`;for(let i=0;i<(o.count||1);i++){const x=25+i*30;if(o.shape==='square')s+=`<rect x="${x}" y="${y-12}" width="24" height="24" rx="4" fill="${color}"/>`;else if(o.shape==='triangle')s+=`<path d="M${x+12} ${y-14}L${x+25} ${y+12}L${x-1} ${y+12}Z" fill="${color}"/>`;else if(o.shape==='star')s+=`<path d="M${x+12} ${y-16}l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="${color}"/>`;else s+=`<circle cx="${x+12}" cy="${y}" r="12" fill="${color}"/>`;}return s+'</svg>';}
 global.TTD_MULTICONDITION_V1={solve,render,choiceSignature,COLORS,SHAPES,POS};
})(window);
