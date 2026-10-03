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

  // Grade 1 English "Sắp xếp chữ cái": reliable English speech and retry
  // until correct. This is intentionally scoped to this page only.
  function patchVocaScramble(){
    if(!/voca-scramble\.html$/i.test(location.pathname)) return;
    if(typeof finish!=='function' || typeof speakWord!=='function') return;
    if(window.__vocaScramblePatched) return;
    window.__vocaScramblePatched=true;

    speakWord=function(word){
      const text=String(word||'').trim();
      if(!text) return;
      try{
        const synth=window.speechSynthesis;
        if(!synth) return;
        synth.cancel();
        synth.resume();
        const utterance=new SpeechSynthesisUtterance(text);
        utterance.lang='en-US';
        utterance.rate=.78;
        utterance.pitch=1;
        utterance.volume=1;
        const voices=synth.getVoices();
        const voice=voices.find(v=>/^en-US$/i.test(v.lang)) || voices.find(v=>/^en[-_]/i.test(v.lang));
        if(voice) utterance.voice=voice;
        synth.speak(utterance);
      }catch(e){ console.warn('Speech synthesis unavailable:',e); }
    };

    finish=function(){
      if(answered) return;
      const q=questions?.[qi];
      if(!q || !Array.isArray(answer)) return;
      const word=q.word;
      const got=answer.map(x=>x?x.char:'').join('');
      const ok=got===word;
      const feedback=document.getElementById('feedback');
      const check=document.getElementById('checkBtn');
      const next=document.getElementById('nextBtn');
      if(ok){
        answered=true;
        score++;
        if(feedback){feedback.className='feedback good';feedback.textContent='🎉 Chính xác!';}
        speakWord(word);
        document.getElementById('score').textContent=score;
        check?.classList.add('hidden');
        next?.classList.remove('hidden');
        if(window.learningSync?.queue) window.learningSync.queue({voca_scramble:{current:qi+1,score,updatedAt:new Date().toISOString()}});
      }else{
        answered=false;
        if(feedback){feedback.className='feedback bad';feedback.textContent='💪 Chưa đúng, bé thử lại nhé!';}
        if(typeof playWrongSound==='function') playWrongSound();
        check?.classList.remove('hidden');
        next?.classList.add('hidden');
      }
    };

    const speaker=document.getElementById('speaker');
    if(speaker){
      speaker.addEventListener('click',function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        const q=questions?.[qi];
        if(q) speakWord(q.word);
      },{capture:true});
    }
  }

  function bootPatch(){
    patchVocaScramble();
    if(!window.__vocaScramblePatched) setTimeout(patchVocaScramble,0);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bootPatch,{once:true}); else bootPatch();
})();
// Shared navigation hardening: fixed menu position and isolated icon sizing on every page.
