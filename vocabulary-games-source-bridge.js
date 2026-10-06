(function(){'use strict';
const page=(location.pathname.split('/').pop()||'').toLowerCase();
if(page!=='english.html'&&page!=='voca-scramble.html')return;
function load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function normalizeWord(x){return String(typeof x==='string'?x:(x&&x.word)||'').trim().toLowerCase()}
async function boot(){
  try{
    if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)await load('supabase-config.js?v=20261006v2');
    if(!window.supabase?.createClient)await load('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
    await load('vocabulary-source-sync.js?v=20261006v2');
    await load('vocabulary-db.js?v=20261006v2');
    await window.VocabularySourceSync.init();
    const sourceData=await window.VocabularySourceSync.getData();
    const ids=new Set(window.VocabularySourceSync.getSelected());
    await window.VocabularyDB.ensureSeed(sourceData.words||[],w=>'');
    const dbWords=await window.VocabularyDB.list();
    const selected=dbWords.filter(w=>(Array.isArray(w.source_ids)?w.source_ids:[]).some(id=>ids.has(id))).map(w=>w.word).filter(Boolean);
    localStorage.setItem('grade1EnglishSelectedWords',JSON.stringify(selected));
    if(page==='voca-scramble.html'){
      const setup=document.querySelector('#setupText');
      if(setup)setup.textContent=selected.length?`Đã chọn ${selected.length} từ.`:'Chưa có từ thuộc nguồn đã chọn.';
      window.dispatchEvent(new CustomEvent('vocabularySelectedWordsChanged',{detail:{words:selected}}));
      return;
    }
    if(!window.__vocabularyGamesFetchPatched){
      const originalFetch=window.fetch.bind(window);
      window.fetch=async function(input,init){
        const url=typeof input==='string'?input:(input&&input.url)||'';
        const response=await originalFetch(input,init);
        if(!/data\/grade1\/english\/vocabulary\.json(?:[?#]|$)/i.test(url)||!response.ok)return response;
        try{
          const data=await response.clone().json();
          const words=Array.isArray(data.words)?[...data.words]:[];
          const existing=new Set(words.map(normalizeWord).filter(Boolean));
          selected.forEach(word=>{const key=normalizeWord(word);if(key&&!existing.has(key)){words.push({word,sourceIds:[...ids]});existing.add(key)}});
          data.words=words;
          return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json'}});
        }catch(e){return response}
      };
      window.__vocabularyGamesFetchPatched=true;
    }
    window.dispatchEvent(new CustomEvent('vocabularySelectedWordsChanged',{detail:{words:selected}}));
    if(typeof window.loadVocabulary==='function')window.loadVocabulary();
  }catch(e){console.warn('Vocabulary source bridge unavailable',e)}
}
window.addEventListener('vocabularySourcesChanged',()=>boot());
boot();
})();