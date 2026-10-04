/* TTD Matrix Transform v6 — position, direction, color and count transformations */
(function(global){
 const DIR=['up','right','down','left'];
 const COLORS=['red','blue','green','yellow'];
 const clone=x=>JSON.parse(JSON.stringify(x));
 function transform(cell,rule){const x=clone(cell); if(rule.dirStep)x.direction=DIR[(DIR.indexOf(x.direction)+rule.dirStep+4)%4]; if(rule.colorStep)x.color=COLORS[(COLORS.indexOf(x.color)+rule.colorStep+4)%4]; if(rule.countDelta)x.count=Math.max(1,x.count+rule.countDelta); if(rule.mirror)x.position={x:1-(x.position?.x??0),y:x.position?.y??0}; return x;}
 function solve(grid,rowRule,colRule){const a=grid[2][0],b=grid[2][1]; if(!a||!b)return null; const candidate=transform(a,rowRule); const fromB=transform(b,colRule); return {candidate,fromB,consistent:JSON.stringify(candidate)===JSON.stringify(fromB)};}
 function render(cell,size=100){if(!cell)return ''; const c=cell.color||'#9ec5ff',d=cell.direction||'up',n=cell.count||1; const pos=cell.position||{x:.5,y:.5}; let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="100%" height="100%" rx="12" fill="#f7f9fc"/>`; for(let i=0;i<n;i++){const cx=18+(i%3)*30,cy=20+Math.floor(i/3)*30; s+=`<circle cx="${cx}" cy="${cy}" r="8" fill="${c}"/>`;} const x=size*pos.x,y=size*pos.y; s+=`<path d="M${x} ${y-18}L${x+10} ${y}L${x} ${y+18}L${x-10} ${y}Z" fill="none" stroke="${c}" stroke-width="3" transform="rotate(${DIR.indexOf(d)*90} ${x} ${y})"/>`; return s+'</svg>';}
 global.TTD_MATRIX_TRANSFORM_V6={DIR,COLORS,transform,solve,render};
})(window);
