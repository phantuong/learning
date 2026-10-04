/* TTD Shape Composition v2 — missing-piece + split/combine models */
(function(global){
 const C={red:'#ef4444',blue:'#3b82f6',green:'#22c55e'};
 const clone=x=>JSON.parse(JSON.stringify(x));
 function key(p){return [p.shape,p.color,p.x,p.y,p.rotation||0].join('|')}
 function norm(parts){return (parts||[]).map(p=>({...p,rotation:(p.rotation||0)%360})).sort((a,b)=>key(a).localeCompare(key(b)))}
 function equal(a,b){return JSON.stringify(norm(a))===JSON.stringify(norm(b))}
 function subtract(target,known){const m=norm(known).map(key);return norm(target).filter(p=>{const k=key(p),i=m.indexOf(k);if(i>=0){m.splice(i,1);return false}return true})}
 function render(parts,size=150){let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-70 -70 140 140" width="${size}" height="${size}"><rect x="-70" y="-70" width="140" height="140" rx="14" fill="#f7f9fc"/>`;for(const p of parts||[]){const col=C[p.color]||C.blue,x=p.x||0,y=p.y||0,r=p.rotation||0,t=`translate(${x} ${y}) rotate(${r})`;if(p.shape==='square')s+=`<rect transform="${t}" x="-18" y="-18" width="36" height="36" rx="4" fill="${col}"/>`;else if(p.shape==='triangle')s+=`<path transform="${t}" d="M0 -22L22 18L-22 18Z" fill="${col}"/>`;else if(p.shape==='semicircle')s+=`<path transform="${t}" d="M-22 0A22 22 0 0 1 22 0L-22 0Z" fill="${col}"/>`;else s+=`<circle transform="${t}" cx="0" cy="0" r="22" fill="${col}"/>`;}return s+'</svg>'}
 global.TTD_COMPOSITION_V2={equal,norm,subtract,render,clone};
})(window);
