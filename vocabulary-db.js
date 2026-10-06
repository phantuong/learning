const VocabularyDB=(()=>{const TABLE='vocabulary_entries';const fields='id,word,vietnamese_meaning,ipa,source_ids,image_url,image_source,updated_at';const client=()=>window.supabaseClient||window.supabase;function sb(){const c=window.supabaseClient||window.supabase;if(c?.from)return c;if(window.supabase?.createClient&&window.SUPABASE_URL&&window.SUPABASE_ANON_KEY)return window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);throw new Error('Supabase client not available')}
async function list(){
  try{
    const {data,error}=await sb().from(TABLE).select(fields).order('word');
    if(error)throw error;
    return data||[];
  }catch(clientError){
    if(!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY)throw clientError;
    const url=`${window.SUPABASE_URL}/rest/v1/${TABLE}?select=${encodeURIComponent(fields)}&order=word`;
    const res=await fetch(url,{cache:'no-store',headers:{apikey:window.SUPABASE_ANON_KEY,Authorization:`Bearer ${window.SUPABASE_ANON_KEY}`}});
    if(!res.ok)throw new Error(`Supabase REST ${res.status}: ${await res.text()}`);
    return await res.json();
  }
}
async function ensureSeed(words,meaningFn){const existing=await list();const have=new Set(existing.map(x=>String(x.word).toLowerCase()));const missing=(words||[]).filter(x=>!have.has(String(x.word).toLowerCase()));if(!missing.length)return existing;const rows=[];for(const w of missing){let meaning='';try{meaning=await meaningFn?.(w.word)||''}catch{}rows.push({word:w.word,vietnamese_meaning:meaning||null,source_ids:w.sourceIds||[]})}if(rows.length){const {error}=await sb().from(TABLE).insert(rows);if(error)throw error}return list()}
async function updateMeaning(word,meaning){const {data,error}=await sb().from(TABLE).update({vietnamese_meaning:String(meaning||'').trim()||null}).eq('word',word).select(fields).single();if(error)throw error;return data}
async function updateImage(word,imageUrl,imageSource){const {error}=await sb().from(TABLE).update({image_url:imageUrl||null,image_source:imageSource||null}).eq('word',word);if(error)throw error}
return{list,ensureSeed,updateMeaning,updateImage};})();