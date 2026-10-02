(function(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const links={
    english:['english.html','🔤🌈','Tiếng Anh'],
    vocab:['vocabulary-list.html','↳','Vocabulary List'],
    math:['math.html','➕','Toán'],
    addsub:['cong-tru-10.html','↳','Cộng Trừ Phạm Vi 10'],
    compare:['so-sanh.html','↳','So sánh']
  };
  function active(p){return current===p}
  function build(){
    const nav=document.querySelector('#gradeNav, #nav, .nav');
    if(!nav)return;
    const course=(href,label,icon)=>`<a href="${href}" class="${active(href)?'active':''}">${icon} ${label}</a>`;
    nav.innerHTML=`
      <div>
        <button type="button" class="grade-toggle grade" data-grade="1">📂 <span>Lớp 1</span><span class="chev">⌃</span></button>
        <div class="subnav sub open" id="shared-grade-1">
          ${course('english.html','Tiếng Anh','🔤🌈')}
          <div class="course-list courses">
            ${course('english.html','Vocabulary Games','↳')}
            ${course('vocabulary-list.html','Vocabulary List','↳')}
          </div>
          ${course('math.html','Toán','➕')}
          <div class="course-list courses">
            ${course('cong-tru-10.html','Cộng Trừ Phạm Vi 10','↳')}
            ${course('so-sanh.html','So sánh','↳')}
          </div>
          <a href="class.html?grade=1" class="${current==='class.html'?'active':''}">📚 Các môn học</a>
        </div>
      </div>
      ${Array.from({length:11},(_,i)=>{const g=i+2;return `<div><a href="class.html?grade=${g}">📁 Lớp ${g}</a></div>`}).join('')}`;
    const grade=nav.querySelector('[data-grade]');
    grade&&grade.addEventListener('click',()=>document.getElementById('shared-grade-1')?.classList.toggle('open'));
  }

  /* Level 5: mobile-friendly drag and drop.
     The original implementation used native HTML drag events plus a pointer fallback.
     On iPhone/iPad this could feel like a tap-and-drop because there was no visual item
     following the finger. This enhancement provides a real floating tile and keeps the
     source row and destination row in sync. */
  function enhanceLevel5(){
    if(!document.querySelector('.sort-area') || typeof sortState==='undefined' || typeof qs==='undefined')return;
    const quiz=document.querySelector('#quiz');
    if(!quiz || quiz.dataset.level5Enhanced==='1')return;
    quiz.dataset.level5Enhanced='1';

    if(!document.getElementById('level5-touch-style')){
      const style=document.createElement('style');
      style.id='level5-touch-style';
      style.textContent=`
        .sort-tile,.sort-slot{touch-action:none;-webkit-touch-callout:none}
        .sort-tile{transition:transform .12s,box-shadow .12s,opacity .12s}
        .sort-tile.touch-used{display:none!important}
        .sort-slot.filled{background:#fff0f7!important;border-color:#ec8fbc!important;color:#d44b8c!important;box-shadow:0 3px 9px #ec5fa422}
        .sort-slot.filled{font-size:25px;font-weight:950}
        .sort-touch-ghost{position:fixed;z-index:99999;pointer-events:none;width:58px;height:58px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:#ffb7d7;border:2px solid #ec5fa4;color:#29243b;font-size:25px;font-weight:950;box-shadow:0 12px 28px #ec5fa455;transform:translate(-50%,-50%) scale(1.08)}
        @media(max-width:760px){.sort-slot.filled{font-size:21px}.sort-touch-ghost{width:42px;height:48px;font-size:21px;border-radius:10px}}
      `;
      document.head.appendChild(style);
    }

    function redraw(){
      const q=qs[pos];
      if(!q || !q.sort)return;
      const pool=document.querySelector('#pool');
      const slots=document.querySelector('#slots');
      if(!pool||!slots)return;
      const used=new Set(sortState.filter(v=>v!==null).map(String));
      pool.innerHTML=q.pool.filter(n=>!used.has(String(n))).map((n,i)=>tile(String(n),'pool',i)).join('');
      slots.innerHTML=q.nums.map((_,i)=>`<div class="sort-slot ${sortState[i]!==null?'filled':''}" data-slot="${i}">${sortState[i]!==null?sortState[i]:''}</div>`).join('');
      document.querySelector('#sortAnswer').disabled=sortState.some(x=>x===null);
      bind();
    }

    function tile(value){return `<div class="sort-tile" draggable="false" data-value="${value}" data-where="pool">${value}</div>`}

    function place(value,slot){
      if(value===null||value===undefined)return;
      value=String(value);
      const old=sortState.indexOf(value);
      if(old>=0)sortState[old]=null;
      const occupant=sortState[slot];
      if(occupant!==null && occupant!==undefined){
        if(old===slot)return;
        const empty=sortState.findIndex(x=>x===null);
        if(empty>=0)sortState[empty]=occupant;
        else return;
      }
      sortState[slot]=value;
      redraw();
    }

    function returnToPool(value){
      const old=sortState.indexOf(String(value));
      if(old>=0){sortState[old]=null;redraw()}
    }

    function moveToSlot(value,target){
      const slot=target&&target.closest('.sort-slot');
      if(slot){place(value,Number(slot.dataset.slot));return true}
      const pool=target&&target.closest('#pool');
      if(pool){returnToPool(value);return true}
      return false;
    }

    function bind(){
      document.querySelectorAll('.sort-tile,.sort-slot.filled').forEach(el=>{
        if(el.dataset.touchBound==='1')return;
        el.dataset.touchBound='1';
        el.addEventListener('pointerdown',start,true);
      });
    }

    function start(e){
      if(e.pointerType==='mouse' && e.button!==0)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const source=this;
      const value=source.dataset.value || source.textContent.trim();
      const startX=e.clientX,startY=e.clientY;
      let active=false,ghost=null;

      const move=ev=>{
        if(!active){
          if(Math.hypot(ev.clientX-startX,ev.clientY-startY)<4)return;
          active=true;
          ghost=document.createElement('div');
          ghost.className='sort-touch-ghost';
          ghost.textContent=value;
          document.body.appendChild(ghost);
          source.classList.add('dragging');
        }
        ghost.style.left=ev.clientX+'px';
        ghost.style.top=ev.clientY+'px';
      };
      const end=ev=>{
        document.removeEventListener('pointermove',move,true);
        document.removeEventListener('pointerup',end,true);
        document.removeEventListener('pointercancel',end,true);
        if(ghost)ghost.remove();
        source.classList.remove('dragging');
        if(!active)return;
        const target=document.elementFromPoint(ev.clientX,ev.clientY);
        moveToSlot(value,target);
      };
      document.addEventListener('pointermove',move,true);
      document.addEventListener('pointerup',end,true);
      document.addEventListener('pointercancel',end,true);
    }

    bind();
  }

  function watchLevel5(){
    const quiz=document.querySelector('#quiz');
    if(!quiz)return;
    const observer=new MutationObserver(()=>{
      if(document.querySelector('.sort-area'))enhanceLevel5();
      else delete quiz.dataset.level5Enhanced;
    });
    observer.observe(quiz,{childList:true,subtree:true});
    if(document.querySelector('.sort-area'))enhanceLevel5();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>{build();watchLevel5()});
  }else{
    build();watchLevel5();
  }
})();