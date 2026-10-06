(function(){'use strict';
const page=(location.pathname.split('/').pop()||'').toLowerCase();
if(page!=='english.html'&&page!=='voca-scramble.html')return;
const SOURCE_KEY='grade1EnglishSelectedSources',WORDS_KEY='grade1EnglishSelectedWords';
function load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function ids(){try{const v=JSON.parse(localStorage.getItem(SOURCE_KEY)||'[]');return new Set(Array.isArray(v)?v.filter(Boolean):[])}catch{return new Set()}}
function word(x){return String(x?.word||'').trim().toLowerCase()}
async function boot(){
 try{
  if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)await load('supabase-config.js?v=20261006v5');
  const selectedIds=ids();
  if(!selectedIds.size){localStorage.setItem(WORDS_KEY,'[]');return;}
  const url=`${window.SUPABASE_URL}/rest/v1/vocabulary_entries?select=word,source_ids,vietnamese_meaning,ipa,image_url&order=word`;
  const r=await fetch(url,{cache:'no-store',headers:{apikey:window.SUPABASE_ANON_KEY,Accept:'application/json'}});
  if(!r.ok)throw Error('Supabase vocabulary '+r.status);
  const rows=await r.json();
  const seen=new Set(),selected=[];
  rows.forEach(x=>{const w=word(x);if(w&&!seen.has(w)&&Array.isArray(x.source_ids)&&x.source_ids.some(id=>selectedIds.has(id))){seen.add(w);selected.push(x.word)}});
  localStorage.setItem(WORDS_KEY,JSON.stringify(selected));
  if(page==='voca-scramble.html'){
   const setup=document.querySelector('#setupText');
   if(setup)setup.textContent=selected.length?`Đã chọn ${selected.length} từ.`:'Chưa có từ thuộc nguồn đã chọn.';
  }
  window.dispatchEvent(new CustomEvent('vocabularySelectedWordsChanged',{detail:{words:selected,sourceIds:[...selectedIds]}}));
  if(page==='english.html'&&typeof window.loadVocabulary==='function')window.loadVocabulary();
 }catch(e){console.warn('Vocabulary games source bridge unavailable',e)}
}
window.addEventListener('vocabularySourcesChanged',boot);
window.addEventListener('DOMContentLoaded',boot);
boot();
})();