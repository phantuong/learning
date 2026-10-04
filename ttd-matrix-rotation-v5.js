/* TTD Matrix Rotation v5 — visual transformation engine */
(function(global){
 const S=['circle','square','triangle'], C=['red','blue','green'];
 function rotateShape(shape,steps){return S[(S.indexOf(shape)+steps+S.length)%S.length]}
 function rotateCell(cell,steps){return {...cell,shape:rotateShape(cell.shape,steps)};}
 function solve(grid,step=1){const a=grid[2][0],b=grid[2][1];if(!a||!b)return null;return rotateCell(b,step)}
 function renderCell(cell,size=90){if(!cell)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90" height="90"><rect width="90" height="90" rx="12" fill="#f7f9fc"/><text x="45" y="55" text-anchor="middle" font-size="30">?</text></svg>';const color=cell.color||'#9ec5ff',shape=cell.shape||'circle',count=cell.count||1;let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="100%" height="100%" rx="12" fill="#f7f9fc"/>`;for(let i=0;i<count;i++){const x=15+(i%3)*25,y=15+Math.floor(i/3)*25;if(shape==='square')s+=`<rect x="${x}" y="${y}" width="18" height="18" rx="3" fill="${color}"/>`;else if(shape==='triangle')s+=`<path d="M${x+9} ${y}L${x+18} ${y+18}L${x} ${y+18}Z" fill="${color}"/>`;else s+=`<circle cx="${x+9}" cy="${y+9}" r="9" fill="${color}"/>`;}return s+'</svg>'}
 global.TTD_MATRIX_ROTATION_V5={solve,rotateCell,renderCell,rotateShape};
})(window);
