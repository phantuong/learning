/* TTD Spatial Cube v2 — face labels rotate with the cube */
(function(global){
 function clone(c){return JSON.parse(JSON.stringify(c))}
 function rotate(c,axis,turns){let r=clone(c);turns=((turns%4)+4)%4;while(turns--){if(axis==='x')[r.front,r.top,r.back,r.bottom]=[r.bottom,r.front,r.top,r.back];else if(axis==='y')[r.front,r.right,r.back,r.left]=[r.left,r.front,r.right,r.back];else [r.top,r.right,r.bottom,r.left]=[r.left,r.top,r.right,r.bottom]}return r}
 function key(c){return ['top','bottom','front','back','left','right'].map(k=>c[k]).join('|')}
 function solve(m){const expected=rotate(m.cube,m.axis,m.turns);return m.choices.findIndex(c=>key(c)===key(expected))}
 function render(c,size=170){const face=(l,p,f)=>`<polygon points="${p}" fill="${f}" stroke="#334155" stroke-width="2"/><text x="${l.x}" y="${l.y}" text-anchor="middle" dominant-baseline="middle" font-size="18" font-weight="700">${l.v}</text>`;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170" width="${size}" height="${size}">${face({x:85,y:40,v:c.top||''},'85,12 145,45 85,78 25,45','#dbeafe')}${face({x:55,y:105,v:c.front||''},'25,45 85,78 85,145 25,112','#bfdbfe')}${face({x:115,y:105,v:c.right||''},'85,78 145,45 145,112 85,145','#93c5fd')}</svg>`}
 global.TTD_SPATIAL_CUBE_V2={rotate,solve,render,key};
})(window);
