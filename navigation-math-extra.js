(function(){'use strict';
  function add(){
    const grade=document.getElementById('nv-g-1');
    if(!grade)return false;
    const subjects=[...grade.querySelectorAll('.nv-subject')];
    const math=subjects.find(x=>/\bToán\b/i.test(x.querySelector('.nv-subject-btn')?.textContent||''));
    const courses=math?.querySelector('.nv-courses');
    if(!courses)return false;
    let a=courses.querySelector('a[href*="tach-gop.html"]');
    if(!a){
      a=document.createElement('a');
      a.href='tach-gop.html';
      a.className='nv-course';
      a.innerHTML='<span class="icon">🧩</span><span>Tách Gộp</span>';
      const addSub=courses.querySelector('a[href="cong-tru-10.html"]')||courses.querySelector('a[href*="cong-tru"]');
      if(addSub) addSub.insertAdjacentElement('afterend',a); else courses.appendChild(a);
    }
    a.classList.toggle('active',/tach-gop\.html$/i.test(location.pathname));
    return true;
  }
  function boot(){
    if(add())return;
    let tries=0;
    const timer=setInterval(()=>{tries++;if(add()||tries>=40)clearInterval(timer)},100);
    if(document.body)new MutationObserver(()=>add()).observe(document.body,{subtree:true,childList:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();