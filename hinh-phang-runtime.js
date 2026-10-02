(function(){
  if(window.__flatShapesRuntime)return;
  window.__flatShapesRuntime=true;

  function patchShape(){
    if(typeof window.shape!=='function') return;
    const COLORS={circle:['#ffd9ec','#ec5fa4'],triangle:['#ffe6a8','#e3a72f'],square:['#dce8ff','#6d88c7'],rectangle:['#d9f5e5','#35a874']};
    window.shape=function(t,x,y,w,h,fill,stroke,extra=''){
      const c=COLORS[t]||COLORS.rectangle, f=fill||c[0], s=stroke||c[1];
      if(t==='circle') return `<circle class="tile" cx="${x+w/2}" cy="${y+h/2}" r="${Math.min(w,h)*.38}" fill="${f}" stroke="${s}" stroke-width="4" ${extra}/>`;
      if(t==='triangle') return `<polygon class="tile" points="${x+w/2},${y+h*.08} ${x+w*.08},${y+h*.9} ${x+w*.92},${y+h*.9}" fill="${f}" stroke="${s}" stroke-width="4" stroke-linejoin="round" ${extra}/>`;
      if(t==='square'){
        const size=Math.min(w,h),ox=x+(w-size)/2,oy=y+(h-size)/2;
        return `<rect class="tile" x="${ox+size*.08}" y="${oy+size*.08}" width="${size*.84}" height="${size*.84}" rx="7" fill="${f}" stroke="${s}" stroke-width="4" ${extra}/>`;
      }
      return `<rect class="tile" x="${x+w*.08}" y="${y+h*.08}" width="${w*.84}" height="${h*.84}" rx="3" fill="${f}" stroke="${s}" stroke-width="4" ${extra}/>`;
    };
  }

  function bindStart(){
    const btn=document.getElementById('startBtn');
    if(!btn || typeof window.startQuiz!=='function')return false;
    const fresh=btn.cloneNode(true);
    btn.replaceWith(fresh);
    fresh.addEventListener('click',function(e){e.preventDefault();window.startQuiz();});
    return true;
  }

  function init(){
    patchShape();
    bindStart();
    if(typeof window.renderLevels==='function') window.renderLevels();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();