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

(function(){'use strict';
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='english.html'&&page!=='voca-scramble.html')return;
  function load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
  async function boot(){
    try{
      if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)await load('supabase-config.js?v=20261006v2');
      await load('vocabulary-source-sync.js?v=20261006v1');
      await window.VocabularySourceSync.init();
      const data=await window.VocabularySourceSync.getData();
      const ids=new Set(window.VocabularySourceSync.getSelected());
      const selected=(data.words||[]).filter(w=>(w.sourceIds||[]).some(id=>ids.has(id))).map(w=>w.word).filter(Boolean);
      localStorage.setItem('grade1EnglishSelectedWords',JSON.stringify(selected));
      if(page==='english.html'){
        const sub=document.querySelector('.subtitle');if(sub)sub.textContent='Luyện từ vựng thuộc các nguồn đã chọn';
        const empty=document.querySelector('#emptyPanel h2');if(empty)empty.textContent='📚 Chưa có nguồn nào được chọn';
        const emptyText=document.querySelector('#emptyPanel p');if(emptyText)emptyText.textContent='Hãy vào Danh sách Từ Vựng và chọn ít nhất một nguồn để bắt đầu.';
        if(typeof window.loadVocabulary==='function')window.loadVocabulary();
      }else{
        const setup=document.querySelector('#setupText');if(setup)setup.textContent=selected.length?`Có ${selected.length} từ thuộc các nguồn đã chọn.`:'Chưa có từ thuộc nguồn đã chọn.';
        if(typeof window.allWords!=='undefined')window.allWords=selected;
      }
    }catch(e){console.warn('Vocabulary source bridge unavailable',e)}
  }
  window.addEventListener('vocabularySourcesChanged',boot);
  boot();
})();

(function(){'use strict';
  const PAGE=/tach-gop\.html$/i;
  const KEY='grade1TachGopPreferencesV1';
  let client=null,user=null,ready=null,suppress=false;
  function localRead(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{}}catch{return{}}}
  function localWrite(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}}
  function loadScript(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
  async function ensure(){if(ready)return ready;ready=(async()=>{if(!window.supabase?.createClient)await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)await loadScript('supabase-config.js?v=20261006v2');if(!window.supabase?.createClient||!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)return false;client=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);const r=await client.auth.getUser();user=r.data?.user||null;return !!user})().catch(()=>false);return ready}
  function clean(v){return{level:[2,3].includes(Number(v.level))?Number(v.level):2,number_range:[10,20,50,100].includes(Number(v.number_range))?Number(v.number_range):10,question_type:['split','remaining','mixed'].includes(v.question_type)?v.question_type:'split'}}
  function apply(v){const p=clean(v);try{if(typeof window.pickLevel==='function')window.pickLevel(p.level);if(typeof window.pickRange==='function')window.pickRange(p.number_range);if(typeof window.pickType==='function')window.pickType(p.question_type)}catch(e){console.warn('Could not apply Tách Gộp preferences',e)}return p}
  async function persist(v){const p=clean(v);localWrite(p);try{if(await ensure()){const r=await client.from('tach_gop_preferences').upsert({user_id:user.id,...p,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(r.error)throw r.error}}catch(e){console.warn('Tách Gộp cloud sync unavailable',e)}}
  function current(){return{level:typeof level!=='undefined'?level:2,number_range:typeof range!=='undefined'?range:10,question_type:typeof type!=='undefined'?type:'split'}}
  async function load(){if(!PAGE.test(location.pathname))return;const local=clean(localRead());suppress=true;apply(local);suppress=false;if(!(await ensure()))return;try{const r=await client.from('tach_gop_preferences').select('level,number_range,question_type').eq('user_id',user.id).maybeSingle();if(r.error)throw r.error;if(r.data){const cloud=clean(r.data);suppress=true;apply(cloud);suppress=false;localWrite(cloud)}else await persist(current())}catch(e){suppress=false;console.warn('Tách Gộp preferences could not be loaded',e)}}
  function wrap(){if(window.__tachGopPrefsWrapped)return;window.__tachGopPrefsWrapped=true;const wrapFn=(name,field)=>{const original=window[name];if(typeof original!=='function')return;window[name]=function(v){const r=original(v);if(!suppress){const p=current();p[field]=field==='level'?Number(v):field==='number_range'?Number(v):String(v);persist(p)}return r}};wrapFn('pickLevel','level');wrapFn('pickRange','number_range');wrapFn('pickType','question_type')}
  function boot(){if(!PAGE.test(location.pathname))return;wrap();load();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

(function(){'use strict';
  const PAGE=/cong-tru(?:-v3|-v2|-10)?\.html$/i;
  const KEY='learning_math_add_sub_preferences_v5';
  let client=null,user=null,ready=null,suppress=false;
  function loadScript(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
  function localRead(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{}}catch{return{}}}
  function localWrite(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}}
  async function ensure(){if(ready)return ready;ready=(async()=>{if(!window.supabase?.createClient)await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js');if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)await loadScript('supabase-config.js?v=20261006v2');if(!window.supabase?.createClient||!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)return false;client=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);const r=await client.auth.getUser();user=r.data?.user||null;return !!user})().catch(()=>false);return ready}
  function clean(v){const ranges=['10','50','100','1000','inf','result10'];return{level:['no-carry','carry','three','four','sequential'].includes(String(v.level))?String(v.level):'no-carry',range:ranges.includes(String(v.range))?String(v.range):'10',operation:['add','sub','mixed'].includes(String(v.operation))?String(v.operation):'add',mode:['choice','write','speak'].includes(String(v.mode))?String(v.mode):'choice'}}
  function getLocal(){return clean(localRead())}
  function apply(p){const v=clean(p);try{if(typeof window.pickLevel==='function')window.pickLevel(v.level);if(typeof window.pickRange==='function')window.pickRange(v.range);if(typeof window.pickOperation==='function')window.pickOperation(v.operation);if(typeof window.pickMode==='function')window.pickMode(v.mode)}catch(e){console.warn('Could not apply Cộng Trừ preferences',e)}return v}
  async function persist(p){const v=clean(p);localWrite(v);try{if(await ensure()){const r=await client.from('cong_tru_preferences').upsert({user_id:user.id,level:v.level,number_range:v.range,operation:v.operation,answer_mode:v.mode,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(r.error)throw r.error}}catch(e){console.warn('Cộng Trừ cloud sync unavailable',e)}}
  function current(){return getLocal()}
  async function load(){if(!PAGE.test(location.pathname))return;const local=getLocal();suppress=true;apply(local);suppress=false;if(!(await ensure()))return;try{const r=await client.from('cong_tru_preferences').select('level,number_range,operation,answer_mode').eq('user_id',user.id).maybeSingle();if(r.error)throw r.error;if(r.data){const cloud=clean({level:r.data.level,range:r.data.number_range,operation:r.data.operation,mode:r.data.answer_mode});suppress=true;apply(cloud);suppress=false;localWrite(cloud)}else await persist(current())}catch(e){suppress=false;console.warn('Cộng Trừ preferences could not be loaded',e)}}
  function wrap(){if(window.__congTruPrefsWrapped)return;window.__congTruPrefsWrapped=true;const wrapFn=(name,field,normalize)=>{const original=window[name];if(typeof original!=='function')return;window[name]=function(v){const normalized=normalize(v);const r=original(normalized);if(!suppress){const p=current();p[field]=normalized;persist(p)}return r}};wrapFn('pickLevel','level',v=>String(v));wrapFn('pickRange','range',v=>String(v));wrapFn('pickOperation','operation',v=>String(v));wrapFn('pickMode','mode',v=>String(v))}
  function boot(){if(!PAGE.test(location.pathname))return;wrap();load()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
