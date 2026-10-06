(function(){'use strict';
const SOURCE_KEY='grade1EnglishSelectedSources';
const VOCAB_URL='data/grade1/english/vocabulary.json';
const SOURCES_URL='data/grade1/english/vocabulary-sources.json';
let client=null, user=null, ready=null, selected=new Set(), allSources=[];
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
function localRead(){try{return JSON.parse(localStorage.getItem(SOURCE_KEY)||'[]')}catch{return[]}}
function localWrite(v){try{localStorage.setItem(SOURCE_KEY,JSON.stringify([...v]))}catch{}}
async function ensure(){if(ready)return ready;ready=(async()=>{if(!window.supabase?.createClient)await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js');if(!window.supabase?.createClient||!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)return false;client=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);const r=await client.auth.getUser();user=r.data?.user||null;return !!user})().catch(()=>false);return ready}
async function loadSources(){const r=await fetch(SOURCES_URL,{cache:'no-store'});if(!r.ok)throw Error('Không tải được danh sách nguồn');const d=await r.json();allSources=d.sources||[];return allSources}
async function loadSelection(){await loadSources();const local=new Set(localRead().filter(x=>allSources.some(s=>s.id===x)));if(!await ensure()){selected=local.size?local:new Set(allSources.map(s=>s.id));localWrite(selected);return [...selected]}
const r=await client.from('vocabulary_selected_sources').select('source_id').eq('user_id',user.id);if(r.error)throw r.error;const cloud=new Set((r.data||[]).map(x=>x.source_id).filter(x=>allSources.some(s=>s.id===x)));
if(cloud.size){selected=cloud;localWrite(selected)}else{selected=local.size?local:new Set(allSources.map(s=>s.id));localWrite(selected);await persist()}
return [...selected]}
async function persist(){if(!user)return false;const ids=[...selected];let r=await client.from('vocabulary_selected_sources').delete().eq('user_id',user.id);if(r.error)throw r.error;if(ids.length){r=await client.from('vocabulary_selected_sources').insert(ids.map(source_id=>({user_id:user.id,source_id,updated_at:new Date().toISOString()})));if(r.error)throw r.error}localWrite(selected);return true}
async function set(ids){const next=new Set(ids.filter(id=>allSources.some(s=>s.id===id)));if(!next.size&&allSources.length)return [...selected];selected=next;localWrite(selected);try{await ensure();if(user)await persist()}catch(e){console.warn('Vocabulary source cloud sync unavailable',e)};window.dispatchEvent(new CustomEvent('vocabularySourcesChanged',{detail:{sourceIds:[...selected]}}));return [...selected]}
async function toggle(id){const n=new Set(selected);if(n.has(id))n.delete(id);else n.add(id);return set([...n])}
async function getWords(){const r=await fetch(VOCAB_URL,{cache:'no-store'});if(!r.ok)throw Error('Không tải được vocabulary.json');const d=await r.json();const ids=selected;return (d.words||[]).filter(x=>(x.sourceIds||[]).some(id=>ids.has(id)))}
window.VocabularySourceSync={init:loadSelection,loadSelection,loadSources,getSources:()=>allSources,getSelected:()=>[...selected],set,toggle,getWords,getData:async()=>{const r=await fetch(VOCAB_URL,{cache:'no-store'});return r.json()}};
})();
