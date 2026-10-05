(function(){'use strict';
const KEY='grade1EnglishSelectedWords';
const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
function readLocal(){try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return new Set(Array.isArray(v)?v.filter(Boolean):[])}catch{return new Set()}}
function writeLocal(set){localStorage.setItem(KEY,JSON.stringify([...set]))}
function updateCount(){const el=document.getElementById('count');if(!el)return;let total=0;try{const words=window.__vocabularyWords;total=Array.isArray(words)?words.length:0}catch{}if(!total){const cards=document.querySelectorAll('.word-card');const currentText=el.textContent||'';const m=currentText.match(/\/\s*(\d+)\s*từ/);if(m)total=Number(m[1]);}const selected=readLocal().size;if(total)el.textContent=`Đã chọn ${selected} / ${total} từ`}
async function boot(){
  for(let i=0;i<60&&!window.learningAuth;i++)await wait(250);
  const sb=window.learningAuth;
  if(!sb)return;
  let remote=new Set();
  const q=await sb.from('vocabulary_selected_words').select('word');
  if(q.error){console.error('Vocabulary sync load failed:',q.error);return}
  remote=new Set((q.data||[]).map(x=>x.word).filter(Boolean));
  const local=readLocal();
  const merged=new Set([...local,...remote]);
  const changed=merged.size!==local.size||[...merged].some(w=>!local.has(w));
  if(changed)writeLocal(merged);
  const added=[...merged].filter(w=>!remote.has(w));
  if(added.length){const r=await sb.from('vocabulary_selected_words').upsert(added.map(word=>({word})),{onConflict:'user_id,word'});if(r.error)console.error('Vocabulary sync upload failed:',r.error)}
  remote=merged;
  const originalSetItem=localStorage.setItem.bind(localStorage);
  localStorage.setItem=function(k,v){originalSetItem(k,v);if(k!==KEY)return;let next;try{next=new Set(JSON.parse(v||'[]'))}catch{return}syncDelta(next).catch(e=>console.error('Vocabulary sync update failed:',e))};
  async function syncDelta(next){const add=[...next].filter(w=>!remote.has(w));const remove=[...remote].filter(w=>!next.has(w));if(add.length){const r=await sb.from('vocabulary_selected_words').upsert(add.map(word=>({word})),{onConflict:'user_id,word'});if(r.error)throw r.error}if(remove.length){const r=await sb.from('vocabulary_selected_words').delete().in('word',remove);if(r.error)throw r.error}remote=next}
  if(changed)location.reload();
  const obs=new MutationObserver(updateCount);const count=document.getElementById('count');if(count)obs.observe(count,{childList:true,characterData:true,subtree:true});updateCount();
  window.addEventListener('focus',()=>syncFromServer(sb));document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncFromServer(sb)});setInterval(()=>syncFromServer(sb),15000);
  async function syncFromServer(client){const r=await client.from('vocabulary_selected_words').select('word');if(r.error)return;const server=new Set((r.data||[]).map(x=>x.word).filter(Boolean));const current=readLocal();const merged=new Set([...current,...server]);if(merged.size!==current.size){writeLocal(merged);location.reload();return}remote=merged}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
