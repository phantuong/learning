(function(){
  'use strict';
  function install(){
    if(document.getElementById('learning-nav-hardening')) return;
    const s=document.createElement('style');
    s.id='learning-nav-hardening';
    s.textContent=`
      .nv-standard-sidebar,.nv-generated-sidebar{width:260px!important;max-width:260px!important;box-sizing:border-box!important}
      .nv-standard-sidebar .icon,.nv-generated-sidebar .icon{font-size:20px!important;line-height:1!important;width:auto!important;height:auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:none!important}
      .nv-standard-sidebar .nv-subject-btn .icon,.nv-generated-sidebar .nv-subject-btn .icon{width:24px!important;min-width:24px!important;font-size:20px!important;line-height:1!important}
      .nv-standard-sidebar .nv-course .icon,.nv-generated-sidebar .nv-course .icon{width:20px!important;min-width:20px!important;font-size:16px!important;line-height:1!important}
      #menuBtn,.menuBtn,.mobile-btn,.mobile,.menu-button,[data-menu-toggle],.nv-generated-menu{position:fixed!important;top:max(14px,env(safe-area-inset-top))!important;right:auto!important;bottom:auto!important;left:14px!important;transform:none!important;margin:0!important;z-index:1100!important;box-sizing:border-box!important}
      .nv-generated-menu,#menuBtn,.menuBtn,.mobile-btn,.mobile,.menu-button,[data-menu-toggle]{width:44px!important;height:44px!important;min-width:44px!important;max-width:44px!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important}
      .nv-standard-sidebar .nv-subject-btn,.nv-generated-sidebar .nv-subject-btn{font-size:14px!important;line-height:1.25!important}
      .nv-standard-sidebar .nv-course,.nv-generated-sidebar .nv-course{font-size:13px!important;line-height:1.25!important}
      @media(max-width:760px){.nv-standard-sidebar,.nv-generated-sidebar{width:270px!important;max-width:270px!important}.nv-standard-sidebar.open,.nv-generated-sidebar.open{transform:translateX(0)!important}}
    `;
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();

  function patchVocaScramble(){
    if(!/voca-scramble\\.html$/i.test(location.pathname)) return;
    if(typeof finish!=='function' || typeof speakWord!=='function') return;
    if(window.__vocaScramblePatched) return;
    window.__vocaScramblePatched=true;
    speakWord=function(word){const text=String(word||'').trim();if(!text)return;try{const synth=window.speechSynthesis;if(!synth)return;synth.cancel();synth.resume();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.78;u.pitch=1;u.volume=1;const voices=synth.getVoices();const voice=voices.find(v=>/^en-US$/i.test(v.lang))||voices.find(v=>/^en[-_]/i.test(v.lang));if(voice)u.voice=voice;synth.speak(u)}catch(e){console.warn('Speech synthesis unavailable:',e)}};
    finish=function(){if(answered)return;const q=questions?.[qi];if(!q||!Array.isArray(answer))return;const word=q.word,got=answer.map(x=>x?x.char:'').join(''),ok=got===word,feedback=document.getElementById('feedback'),check=document.getElementById('checkBtn'),next=document.getElementById('nextBtn');if(ok){answered=true;score++;if(feedback){feedback.className='feedback good';feedback.textContent='🎉 Chính xác!'}speakWord(word);document.getElementById('score').textContent=score;check?.classList.add('hidden');next?.classList.remove('hidden');if(window.learningSync?.queue)window.learningSync.queue({voca_scramble:{current:qi+1,score,updatedAt:new Date().toISOString()}})}else{answered=false;if(feedback){feedback.className='feedback bad';feedback.textContent='💪 Chưa đúng, bé thử lại nhé!'}if(typeof playWrongSound==='function')playWrongSound();check?.classList.remove('hidden');next?.classList.add('hidden')}};
    const speaker=document.getElementById('speaker');if(speaker)speaker.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();const q=questions?.[qi];if(q)speakWord(q.word)},{capture:true});
  }
  function patchUnit2(){
    if(!/may-academy-unit2-l123\\.html$/i.test(location.pathname))return;
    const phonics=document.querySelector('#phonics .phonics');
    if(phonics){phonics.innerHTML=['c','k','ck','e','h','r','m','d'].map(x=>`<button class="sound" onclick="speak(${JSON.stringify(x)})">${x}</button>`).join('')}
    const sight=document.querySelector('#sight .sight');
    if(sight){sight.innerHTML=['I','can','see','my','a','the','like','is','an','to','have',"haven't",'got','What','this','yes','no','who'].map(x=>`<span>${x}</span>`).join('')}
  }
  function patchUnit3Navigation(){
    if(window.__unit3NavPatched)return;
    const subjects=[...document.querySelectorAll('.nv-subject')];
    const english=subjects.find(el=>/Tiếng Anh/i.test(el.querySelector('.nv-subject-btn')?.textContent||''));
    const courses=english?.querySelector('.nv-courses');
    if(!courses)return;
    if(courses.querySelector('a[href*="may-academy-unit3-l123.html"]')){window.__unit3NavPatched=true;return}
    const a=document.createElement('a');
    a.href='may-academy-unit3-l123.html';
    a.className='nv-course'+(/may-academy-unit3-l123\\.html$/i.test(location.pathname)?' active':'');
    a.innerHTML='<span class="icon">3️⃣</span><span>Unit 3: Lesson 1–2–3</span>';
    courses.appendChild(a);
    window.__unit3NavPatched=true;
  }
  function loadAuth(){
    if(/(^|\\/)auth\\.html$/i.test(location.pathname)) return;
    if(window.__learningAuthLoader)return;
    window.__learningAuthLoader=true;
    const add=(src)=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
    add('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2').then(()=>add('supabase-config.js?v=20261005')).then(()=>add('auth-guard.js?v=20261005')).catch(e=>console.warn('Authentication scripts could not be loaded:',e));
  }
  function loadProgressSync(){
    if(window.__learningProgressSyncLoader)return;
    window.__learningProgressSyncLoader=true;
    const s=document.createElement('script');
    s.src='progress-sync.js?v=20261005b';
    s.async=true;
    s.onerror=e=>console.warn('Reading progress sync could not be loaded:',e);
    document.head.appendChild(s);
  }
  function boot(){patchVocaScramble();patchUnit2();patchUnit3Navigation();loadAuth();loadProgressSync();if(!window.__vocaScramblePatched)setTimeout(patchVocaScramble,0);if(!window.__unit3NavPatched)setTimeout(patchUnit3Navigation,0);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
// Shared navigation hardening: fixed menu position, isolated icon sizing, page-specific compatibility fixes, Unit 3 navigation injection, authentication bootstrap, and reading progress sync.
