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
    const path=(location.pathname.split('/').pop()||'').toLowerCase();
    const addSub=courses.querySelector('a[href="cong-tru-10.html"]');
    if(addSub)addSub.classList.toggle('active',path==='cong-tru-10.html'||path==='cong-tru-v2.html'||path==='cong-tru-v3.html');
    a.classList.toggle('active',path==='tach-gop.html');
    const vietnam=[...grade.querySelectorAll('.nv-subject')].find(x=>/Tiếng Việt/i.test(x.querySelector('.nv-subject-btn')?.textContent||''));
    const vnCourses=vietnam?.querySelector('.nv-courses');
    const reading=vnCourses?.querySelector('a[href="doc-hieu.html"]');
    if(reading)reading.classList.toggle('active',path==='doc-hieu.html'||path==='doc-hieu-v8.html'||path==='doc-hieu-v9.html');
    return true;
  }
  function boot(){
    if(add())return;
    let tries=0;
    const timer=setInterval(()=>{tries++;if(add()||tries>=60)clearInterval(timer)},100);
    if(document.body)new MutationObserver(()=>add()).observe(document.body,{subtree:true,childList:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

(function(){'use strict';
  function applyReadingFont(){
    if(!/doc-hieu(?:-v7)?(?:-v8)?(?:-v9)?\.html$/i.test(location.pathname))return;
    const text=document.getElementById('storyText');
    const reader=document.getElementById('readerView');
    if(!text||!reader)return;
    const size=parseFloat(text.style.fontSize||getComputedStyle(text).fontSize);
    if(!Number.isFinite(size))return;
    const body=reader.querySelector('.story-body');
    if(body)body.style.fontSize=size+'px';
    reader.querySelectorAll('.story-title').forEach(el=>el.style.fontSize=(size*1.15)+'px');
    reader.querySelectorAll('.story-meta').forEach(el=>el.style.fontSize=(size*.72)+'px');
    reader.querySelectorAll('.questions h2').forEach(el=>el.style.fontSize=(size*.9)+'px');
    reader.querySelectorAll('.q-text,.option').forEach(el=>el.style.fontSize=size+'px');
    reader.querySelectorAll('.q-result').forEach(el=>el.style.fontSize=(size*.72)+'px');
  }
  function watch(){
    if(!/doc-hieu(?:-v7)?(?:-v8)?(?:-v9)?\.html$/i.test(location.pathname))return;
    applyReadingFont();
    const text=document.getElementById('storyText');
    if(text&&!text.__readingFontObserver){
      text.__readingFontObserver=new MutationObserver(applyReadingFont);
      text.__readingFontObserver.observe(text,{attributes:true,attributeFilter:['style']});
    }
    const options=document.getElementById('sizeOptions');
    if(options&&!options.__readingFontListener){
      options.__readingFontListener=true;
      options.addEventListener('click',()=>setTimeout(applyReadingFont,0));
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch,{once:true});else watch();
  setTimeout(watch,100);setTimeout(watch,500);
})();