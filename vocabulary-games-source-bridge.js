(function(){'use strict';
const page=(location.pathname.split('/').pop()||'').toLowerCase();
if(page!=='english.html'&&page!=='voca-scramble.html')return;
function load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
async function boot(){
  if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)try{await load('supabase-config.js?v=20261006v2')}catch{}
  try{await load('vocabulary-source-sync.js?v=20261006v1');await window.VocabularySourceSync.init();const data=await window.VocabularySourceSync.getData();const ids=new Set(window.VocabularySourceSync.getSelected());const selected=(data.words||[]).filter(w=>(w.sourceIds||[]).some(id=>ids.has(id))).map(w=>w.word).filter(Boolean);
    localStorage.setItem('grade1EnglishSelectedWords',JSON.stringify(selected));
    if(page==='english.html'){
      const sub=document.querySelector('.subtitle');if(sub)sub.textContent='Luyện từ vựng thuộc các nguồn đã chọn';
      const empty=document.querySelector('#emptyPanel h2');if(empty)empty.textContent='📚 Chưa có nguồn nào được chọn';
      const emptyText=document.querySelector('#emptyPanel p');if(emptyText)emptyText.textContent='Hãy vào Danh sách Từ Vựng và chọn ít nhất một nguồn để bắt đầu.';
      if(typeof window.loadVocabulary==='function')window.loadVocabulary();
    }else{
      const heading=document.querySelector('#setup h2');if(heading)heading.textContent='📚 Từ thuộc các nguồn đã chọn';
      const setup=document.querySelector('#setupText');if(setup)setup.textContent=selected.length?`Có ${selected.length} từ thuộc các nguồn đã chọn.`:'Chưa có từ thuộc nguồn đã chọn.';
      if(typeof window.allWords!=='undefined')window.allWords=selected;
    }
  }catch(e){console.warn('Vocabulary source bridge unavailable',e)}
}
window.addEventListener('vocabularySourcesChanged',()=>boot());boot();
})();
