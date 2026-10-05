(function(){
  'use strict';
  if (!/website-huu-ich\.html$/i.test(location.pathname)) return;
  if (window.__websiteDndFixLoaded) return;
  window.__websiteDndFixLoaded = true;

  function boot(){
    const list=document.getElementById('websiteList');
    if(!list || list.__robustDndInstalled) return;
    list.__robustDndInstalled=true;

    let active=null;
    let moved=false;
    let saveTimer=null;

    function getCards(){ return [...list.querySelectorAll('.website-item')]; }

    async function saveOrder(){
      const sb=window.learningAuth;
      const user=window.learningUser;
      if(!sb || !user) return;
      const cards=getCards();
      try{
        const updates=cards.map((card,index)=>sb.from('user_useful_websites')
          .update({sort_order:index})
          .eq('id',card.dataset.id));
        await Promise.all(updates);
      }catch(e){ console.warn('Website order sync failed:',e); }
    }

    function scheduleSave(){
      clearTimeout(saveTimer);
      saveTimer=setTimeout(saveOrder,80);
    }

    function moveCard(clientY){
      if(!active) return;
      const cards=getCards().filter(c=>c!==active.card);
      let target=null;
      let before=false;
      for(const card of cards){
        const r=card.getBoundingClientRect();
        if(clientY < r.top + r.height/2){ target=card; before=true; break; }
      }
      if(target) list.insertBefore(active.card,target);
      else list.appendChild(active.card);
      moved=true;
    }

    function finish(){
      if(!active) return;
      active.card.classList.remove('dragging');
      if(moved) scheduleSave();
      active=null;
    }

    list.addEventListener('pointerdown',function(e){
      const handle=e.target.closest('.drag-handle');
      if(!handle) return;
      const card=handle.closest('.website-item');
      if(!card) return;
      e.preventDefault();
      try{handle.setPointerCapture(e.pointerId)}catch(_){ }
      active={card,pointerId:e.pointerId,startX:e.clientX,startY:e.clientY};
      moved=false;
      card.classList.add('dragging');
    },{passive:false});

    list.addEventListener('pointermove',function(e){
      if(!active || e.pointerId!==active.pointerId) return;
      e.preventDefault();
      moveCard(e.clientY);
    },{passive:false});

    list.addEventListener('pointerup',function(e){
      if(!active || e.pointerId!==active.pointerId) return;
      e.preventDefault();
      finish();
    },{passive:false});

    list.addEventListener('pointercancel',function(e){
      if(!active || e.pointerId!==active.pointerId) return;
      finish();
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  const observer=new MutationObserver(boot);
  observer.observe(document.body,{childList:true,subtree:true});
})();
