/* TTD Relational Logic v1 — model-first multi-object relations */
(function(global){
 const SHAPES=['circle','square','triangle','star']; const COLORS=['red','blue','green','yellow'];
 function getObject(model,id){return (model.objects||[]).find(o=>o.id===id)}
 function relation(a,op,b){if(!a||!b)return false;switch(op){case'same_shape':return a.shape===b.shape;case'different_shape':return a.shape!==b.shape;case'same_color':return a.color===b.color;case'different_color':return a.color!==b.color;case'left_of':return a.x<b.x;case'right_of':return a.x>b.x;case'above':return a.y<b.y;case'below':return a.y>b.y;case'more_than':return a.count>b.count;case'less_than':return a.count<b.count;case'exactly_one_more':return a.count===b.count+1;default:return false}}
 function satisfies(model,c){return relation(getObject(model,c.a),c.op,getObject(model,c.b))}
 function solve(model){const valid=(model.candidates||[]).filter(c=>(model.conditions||[]).every(x=>satisfies({objects:c.objects},x)));return valid.length===1?valid[0]:null}
 function renderCandidate(c,size=150){let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 120" width="${size}" height="${Math.round(size*2/3)}"><rect width="180" height="120" rx="14" fill="#f7f9fc"/>`;for(const o of c.objects||[]){const col=o.color==='red'?'#ef4444':o.color==='blue'?'#3b82f6':o.color==='green'?'#22c55e':'#eab308',x=o.x,y=o.y;if(o.shape==='square')s+=`<rect x="${x-12}" y="${y-12}" width="24" height="24" rx="4" fill="${col}"/>`;else if(o.shape==='triangle')s+=`<path d="M${x} ${y-15}L${x+15} ${y+12}L${x-15} ${y+12}Z" fill="${col}"/>`;else if(o.shape==='star')s+=`<path d="M${x} ${y-16}l5 11 12 1-9 8 3 12-8-6-10 6 3-12-9-8 12-1z" fill="${col}"/>`;else s+=`<circle cx="${x}" cy="${y}" r="13" fill="${col}"/>`;if((o.count||1)>1)s+=`<text x="${x+18}" y="${y+5}" font-size="13" font-weight="700">×${o.count}</text>`;}return s+'</svg>'}
 global.TTD_RELATIONAL_V1={solve,renderCandidate,relation,SHAPES,COLORS};
})(window);
