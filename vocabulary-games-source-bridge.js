(function(){
  'use strict';
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='english.html'&&page!=='voca-scramble.html')return;
  const SOURCE_KEY='grade1EnglishSelectedSources',WORDS_KEY='grade1EnglishSelectedWords';
  function ids(){try{const v=JSON.parse(localStorage.getItem(SOURCE_KEY)||'[]');return new Set(Array.isArray(v)?v.filter(Boolean):[])}catch{return new Set()}}
  function word(x){return String(x?.word||x||'').trim().toLowerCase()}
  async function fetchWords(selectedIds){
    if(!selectedIds.size)return [];
    if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)throw Error('Supabase config unavailable');
    const url=`${window.SUPABASE_URL}/rest/v1/vocabulary_entries?select=word,source_ids,vietnamese_meaning,ipa,image_url&order=word`;
    const r=await fetch(url,{cache:'no-store',headers:{apikey:window.SUPABASE_ANON_KEY,Accept:'application/json'}});
    if(!r.ok)throw Error('Supabase vocabulary '+r.status);
    const rows=await r.json(),seen=new Set(),selected=[];
    rows.forEach(x=>{const w=word(x);if(w&&!seen.has(w)&&Array.isArray(x.source_ids)&&x.source_ids.some(id=>selectedIds.has(id))){seen.add(w);selected.push(w)}});
    return selected;
  }
  function applyScramble(words){
    if(page!=='voca-scramble.html')return;
    try{allWords=[...words]}catch(e){}
    window.__cloudVocabularyWords=[...words];
    const setup=document.querySelector('#setupText');
    if(setup)setup.textContent=words.length?`Đã chọn ${words.length} từ.`:'Chưa có từ thuộc nguồn đã chọn.';
  }
  function patchEnglishLoader(){
    if(page!=='english.html'||typeof renderQuestion!=='function'||typeof $!=='function'||window.__cloudEnglishLoaderInstalled)return;
    window.__cloudEnglishLoaderInstalled=true;
    window.loadVocabulary=async function(){
      try{
        $('loading').classList.remove('hidden');$('errorPanel').classList.add('hidden');$('emptyPanel').classList.add('hidden');$('gamePanel').classList.add('hidden');
        const words=await fetchWords(ids());
        localStorage.setItem(WORDS_KEY,JSON.stringify(words));
        state.words=words;
        $('loading').classList.add('hidden');
        if(!state.words.length){$('emptyPanel').classList.remove('hidden');return;}
        state.queue=shuffle(state.words);state.index=0;state.score=0;renderQuestion();
      }catch(e){$('loading').classList.add('hidden');$('errorPanel').classList.remove('hidden');$('errorText').textContent=e.message||'Không tải được dữ liệu từ vựng.'}
    };
  }
  async function boot(){
    try{
      const selectedIds=ids();
      if(!selectedIds.size){localStorage.setItem(WORDS_KEY,'[]');applyScramble([]);return;}
      const selected=await fetchWords(selectedIds);
      localStorage.setItem(WORDS_KEY,JSON.stringify(selected));
      window.__cloudVocabularyWords=[...selected];
      patchEnglishLoader();
      applyScramble(selected);
      window.dispatchEvent(new CustomEvent('vocabularySelectedWordsChanged',{detail:{words:selected,sourceIds:[...selectedIds]}}));
      if(page==='english.html'&&typeof window.loadVocabulary==='function')await window.loadVocabulary();
    }catch(e){console.warn('Vocabulary games source bridge unavailable',e);const setup=document.querySelector('#setupText');if(page==='voca-scramble.html'&&setup)setup.textContent='Không tải được danh sách từ từ cloud.'}
  }
  window.addEventListener('vocabularySourcesChanged',boot);
  window.addEventListener('DOMContentLoaded',boot,{once:true});
  boot();
})();
