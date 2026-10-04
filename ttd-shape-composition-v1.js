/* TTD Shape Composition v1 — model-first piece assembly */
(function(global){
 const SHAPES=['circle','square','triangle','semicircle'];
 const COLORS=['red','blue','green'];
 function normalize(p){return {shape:p.shape,color:p.color||'blue',x:p.x||0,y:p.y||0,rotation:p.rotation||0};}
 function rotatePoint(x,y,r){const a=r*Math.PI/180;return{x:Math.round((x*Math.cos(a)-y*Math.sin(a))*100)/100,y:Math.round((x*Math.sin(a)+y*Math.cos(a))*100)/100};}
 function transform(p,r){const n=normalize(p),v=rotatePoint(n.x,n.y,r);return {...n,x:v.x,y:v.y,rotation:(n.rotation+r+360)%360};}
 function canonical(parts){return parts.map(normalize).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));}
 function same(a,b){return JSON.stringify(canonical(a))===JSON.stringify(canonical(b));}
 function render(parts,size=120){const ps=parts||[];let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 -60 120 120" width="${size}" height="${size}"><rect x="-60" y="-60" width="120" height="120" rx="14" fill="#f7f9fc"/>`;for(const p of ps){const n=normalize(p),x=n.x,y=n.y,c=n.color==='red'?'#ef4444':n.color==='green'?'#22c55e':'#3b82f6',t=`translate(${x} ${y}) rotate(${n.rotation})`;if(n.shape==='square')s+=`<rect transform="${t}" x="-18" y="-18" width="36" height="36" rx="4" fill="${c}"/>`;else if(n.shape==='triangle')s+=`<path transform="${t}" d="M0 -21L21 18L-21 18Z" fill="${c}"/>`;else if(n.shape==='semicircle')s+=`<path transform="${t}" d="M-21 0A21 21 0 0 1 21 0Z" fill="${c}"/>`;else s+=`<circle transform="${t}" cx="0" cy="0" r="21" fill="${c}"/>`;}return s+'</svg>';}
 global.TTD_COMPOSITION_V1={same,canonical,transform,render,SHAPES,COLORS};
})(window);
