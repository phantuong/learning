(function(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const links={english:['english.html','🔤🌈','Tiếng Anh'],vocab:['vocabulary-list.html','↳','Vocabulary List'],scramble:['voca-scramble.html','↳','Sắp xếp chữ cái'],math:['math.html','➕','Toán'],addsub:['cong-tru-10.html','↳','Cộng Trừ Phạm Vi 10'],compare:['so-sanh.html','↳','So sánh'],shapes:['hinh-phang.html','↳','Hình phẳng'],vietnamese:['doc-hieu.html','📖','Đọc Hiểu']};
  function active(p){return current===p}
  function build(){
    const nav=document.querySelector('#gradeNav, #nav, .nav'); if(!nav)return;
    const course=(href,label,icon)=>`<a href="${href}" class="${active(href)?'active':''}">${icon} ${label}</a>`;
    nav.innerHTML=`<div><button type="button" class="grade-toggle grade" data-grade="1">📂 <span>Lớp 1</span><span class="chev">⌃</span></button><div class="subnav sub open" id="shared-grade-1">${course('english.html','Tiếng Anh','🔤🌈')}<div class="course-list courses">${course('english.html','Vocabulary Games','↳')}${course('vocabulary-list.html','Vocabulary List','↳')}${course('voca-scramble.html','Sắp xếp chữ cái','↳')}</div>${course('math.html','Toán','➕')}<div class="course-list courses">${course('cong-tru-10.html','Cộng Trừ Phạm Vi 10','↳')}${course('so-sanh.html','So sánh','↳')}${course('hinh-phang.html','Hình phẳng','↳')}</div>${course('doc-hieu.html','Tiếng Việt · Đọc Hiểu','📖')}<a href="class.html?grade=1" class="${current==='class.html'?'active':''}">📚 Các môn học</a></div></div>${Array.from({length:11},(_,i)=>{const g=i+2;return `<div><a href="class.html?grade=${g}">📁 Lớp ${g}</a></div>`}).join('')}`;
    nav.querySelector('[data-grade]')?.addEventListener('click',()=>document.getElementById('shared-grade-1')?.classList.toggle('open'));
  }
  function initFeedbackSounds(){
    if(window.__learningFeedbackSounds)return;
    window.__learningFeedbackSounds=true;
    let ctx=null,lastSignature='',lastAt=0;
    const getCtx=()=>{
      try{
        const AC=window.AudioContext||window.webkitAudioContext;
        if(!AC)return null;
        if(!ctx)ctx=new AC();
        if(ctx.state==='suspended')ctx.resume().catch(()=>{});
        return ctx;
      }catch(e){return null}
    };
    const tone=(c,freq,start,duration,type='sine',volume=.055)=>{
      const osc=c.createOscillator(),gain=c.createGain();
      osc.type=type;osc.frequency.setValueAtTime(freq,start);
      gain.gain.setValueAtTime(0.0001,start);
      gain.gain.exponentialRampToValueAtTime(volume,start+0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001,start+duration);
      osc.connect(gain);gain.connect(c.destination);osc.start(start);osc.stop(start+duration+0.02);
    };
    const cheer=()=>{
      const c=getCtx();if(!c)return;
      const t=c.currentTime;
      [[523.25,0,.16],[659.25,.11,.16],[783.99,.22,.18],[1046.5,.34,.28]].forEach(x=>tone(c,x[0],t+x[1],x[2],'sine',.07));
      tone(c,1318.51,t+.43,.22,'triangle',.045);
    };
    const buzzer=()=>{
      const c=getCtx();if(!c)return;
      const t=c.currentTime;
      tone(c,330,t,.18,'sawtooth',.055);
      tone(c,220,t+.16,.25,'sawtooth',.05);
    };
    const classify=text=>{
      const s=(text||'').replace(/\s+/g,' ').trim().toLowerCase();
      if(!s)return '';
      if(/chính xác|đúng rồi|tuyệt vời|hoan hô|excellent|correct|great job/.test(s))return 'correct';
      if(/chưa đúng|sai rồi|gần đúng|đáp án là|thử lại|incorrect|wrong|try again/.test(s))return 'wrong';
      return '';
    };
    const check=node=>{
      if(!node)return;
      const el=node.nodeType===1?node:node.parentElement;
      if(!el)return;
      const candidates=[el,...(el.parentElement?[el.parentElement]:[])];
      for(const item of candidates){
        const kind=classify(item.textContent||'');
        if(!kind)continue;
        const sig=kind+'|'+(item.textContent||'').trim();
        const now=Date.now();
        if(sig===lastSignature&&now-lastAt<700)return;
        lastSignature=sig;lastAt=now;
        if(kind==='correct')cheer();else buzzer();
        return;
      }
    };
    document.addEventListener('pointerdown',()=>getCtx(),{passive:true,capture:true});
    document.addEventListener('keydown',()=>getCtx(),{passive:true,capture:true});
    const observer=new MutationObserver(mutations=>mutations.forEach(m=>{check(m.target);m.addedNodes&&m.addedNodes.forEach(check)}));
    const startObserver=()=>{if(document.body)observer.observe(document.body,{subtree:true,childList:true,characterData:true})};
    if(document.body)startObserver();else document.addEventListener('DOMContentLoaded',startObserver,{once:true});
  }
  function loadFlatShapesRuntime(){if(current!=='hinh-phang.html'||window.__flatShapesRuntime)return;const s=document.createElement('script');s.src='hinh-phang-runtime.js';s.async=false;document.body.appendChild(s)}
  function ensureFlatShapeLevels(){if(current!=='hinh-phang.html')return;const host=document.getElementById('levels');if(!host||host.children.length)return;const levels=[['1','Nhận biết hình','🔎'],['2','Hình quanh bé','🏠'],['3','Đoán theo đặc điểm','🧠'],['4','Đúng hay sai','🤔'],['5','Ghép hình','🧩'],['6','Chia hình','✂️'],['7','Đếm hình thông minh','🔢'],['8','Mảnh ghép còn thiếu','🧱'],['9','Hình mở & kín','🔓'],['10','Thử thách tổng hợp','🌟']];let selected=1;try{selected=Math.min(10,Math.max(1,Number(localStorage.getItem('flatShapeLevel')||1)))}catch(e){}host.innerHTML='';levels.forEach(([n,label,icon])=>{const b=document.createElement('button');b.type='button';b.className='choice'+(+n===selected?' on':'');b.innerHTML=`<span style="font-size:20px">${icon}</span> Level ${n}<br><small>${label}</small>`;b.addEventListener('click',()=>{selected=+n;try{localStorage.setItem('flatShapeLevel',selected)}catch(e){}host.querySelectorAll('.choice').forEach(x=>x.classList.remove('on'));b.classList.add('on')});host.appendChild(b)})}
  function enhanceLevel5(){if(!document.querySelector('.sort-area')||typeof sortState==='undefined'||typeof qs==='undefined')return;const quiz=document.querySelector('#quiz');if(!quiz)return;if(!document.getElementById('level5-touch-style')){const style=document.createElement('style');style.id='level5-touch-style';style.textContent=`.sort-tile,.sort-slot{touch-action:none;-webkit-touch-callout:none}.sort-tile{transition:transform .12s,box-shadow .12s,opacity .12s}.sort-slot.filled{background:#fff0f7!important;border-color:#ec8fbc!important;color:#d44b8c!important;box-shadow:0 3px 9px #ec5fa422}.sort-slot.filled{font-size:25px;font-weight:950}.sort-touch-ghost{position:fixed;z-index:99999;pointer-events:none;width:58px;height:58px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:#ffb7d7;border:2px solid #ec5fa4;color:#29243b;font-size:25px;font-weight:950;box-shadow:0 12px 28px #ec5fa455;transform:translate(-50%,-50%) scale(1.08)}@media(max-width:760px){.sort-slot.filled{font-size:21px}.sort-touch-ghost{width:42px;height:48px;font-size:21px;border-radius:10px}}`;document.head.appendChild(style)}function redraw(){const q=qs[pos];if(!q||!q.sort)return;const pool=document.querySelector('#pool'),slots=document.querySelector('#slots');if(!pool||!slots)return;const used=new Set(sortState.filter(v=>v!==null).map(String));pool.innerHTML=q.pool.filter(n=>!used.has(String(n))).map(n=>tile(String(n))).join('');slots.innerHTML=q.nums.map((_,i)=>`<div class="sort-slot ${sortState[i]!==null?'filled':''}" data-slot="${i}">${sortState[i]!==null?sortState[i]:''}</div>`).join('');const answer=document.querySelector('#sortAnswer');if(answer)answer.disabled=sortState.some(x=>x===null);bind()}function tile(value){return `<div class="sort-tile" draggable="false" data-value="${value}" data-where="pool">${value}</div>`}function place(value,slot){if(value==null)return;value=String(value);const old=sortState.indexOf(value);if(old>=0)sortState[old]=null;const occupant=sortState[slot];if(occupant!==null&&occupant!==undefined){if(old===slot)return;const empty=sortState.findIndex(x=>x===null);if(empty>=0)sortState[empty]=occupant;else return}sortState[slot]=value;redraw()}function returnToPool(value){const old=sortState.indexOf(String(value));if(old>=0){sortState[old]=null;redraw()}}function moveToSlot(value,target){const slot=target?.closest('.sort-slot');if(slot){place(value,Number(slot.dataset.slot));return}if(target?.closest('#pool'))returnToPool(value)}function bind(){document.querySelectorAll('.sort-tile,.sort-slot.filled').forEach(el=>{if(el.dataset.touchBound==='1')return;el.dataset.touchBound='1';el.addEventListener('pointerdown',start,true)})}function start(e){if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();e.stopImmediatePropagation();const source=this,value=source.dataset.value||source.textContent.trim(),sx=e.clientX,sy=e.clientY;let active=false,ghost=null;const move=ev=>{if(!active){if(Math.hypot(ev.clientX-sx,ev.clientY-sy)<4)return;active=true;ghost=document.createElement('div');ghost.className='sort-touch-ghost';ghost.textContent=value;document.body.appendChild(ghost);source.classList.add('dragging')}ghost.style.left=ev.clientX+'px';ghost.style.top=ev.clientY+'px'};const end=ev=>{document.removeEventListener('pointermove',move,true);document.removeEventListener('pointerup',end,true);document.removeEventListener('pointercancel',end,true);if(ghost)ghost.remove();source.classList.remove('dragging');if(!active)return;moveToSlot(value,document.elementFromPoint(ev.clientX,ev.clientY))};document.addEventListener('pointermove',move,true);document.addEventListener('pointerup',end,true);document.addEventListener('pointercancel',end,true)}bind()}
  function enforceLevel5Button(){if(!document.querySelector('.sort-area'))return;const answer=document.querySelector('#sortAnswer'),next=document.querySelector('#nx');if(answer){answer.textContent='Trả lời';answer.className='sort-answer';answer.style.display='';answer.disabled=sortState.some(x=>x===null)||!!answered}if(next){next.classList.remove('show');next.style.display='none'}}
  function showLevel5Next(){const answer=document.querySelector('#sortAnswer');if(!answer)return;const next=document.createElement('button');next.id='nx';next.className='sort-answer';next.textContent='Tiếp theo →';next.onclick=()=>{if(typeof window.next==='function')window.next()};answer.replaceWith(next)}
  function patchSortFlow(){if(typeof window.checkSort!=='function'||window.checkSort.__patched)return;const original=window.checkSort;const patched=function(){if(!document.querySelector('.sort-area'))return original();if(sortState.some(x=>x===null)||answered)return;answered=true;const q=qs[pos],ok=sortState.join(',')===q.answer,fb=document.querySelector('#fb');if(ok){score++;fb.textContent='🎉 Chính xác!';fb.style.color='#087443'}else{fb.textContent=`💪 Chưa đúng. Đáp án là: ${q.answer.split(',').join(' → ')}`;fb.style.color='#b4232e'}showLevel5Next()};patched.__patched=true;window.checkSort=patched}
  function watchLevel5(){const quiz=document.querySelector('#quiz');if(!quiz)return;const observer=new MutationObserver(()=>{if(document.querySelector('.sort-area')){enhanceLevel5();patchSortFlow()}});observer.observe(quiz,{childList:true,subtree:true});if(document.querySelector('.sort-area')){enhanceLevel5();patchSortFlow();enforceLevel5Button()}}
  function initDocHieuProgress(){if(current!=='doc-hieu.html')return;const advance=()=>{let n=Number(localStorage.getItem('docHieuNextStory')||1);if(!Number.isInteger(n)||n<1||n>500)n=1;localStorage.setItem('docHieuNextStory',n===500?1:n+1)};advance();document.getElementById('nextBtn')?.addEventListener('click',advance)}
  function init(){build();initFeedbackSounds();ensureFlatShapeLevels();loadFlatShapesRuntime();watchLevel5();initDocHieuProgress()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
