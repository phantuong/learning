/* TTD Production Session v1 */
(function(global){
 function shuffle(a,rng=Math.random){const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
 function buildPool(banks,manifest){const allowed=new Set((manifest.banks||[]).flatMap(b=>b.ids||[]));return Object.values(banks).flat().filter(q=>allowed.has(q.id)&&(!q.validation||q.validation.valid))}
 function score(q,selected){let s=Math.random();if(selected.some(x=>x.family===q.family))s-=5;if(selected.some(x=>x.level===q.level))s-=1;return s}
 function createSession(banks,manifest,count=10){const pool=shuffle(buildPool(banks,manifest)),selected=[];while(selected.length<count&&pool.length){let best=null,bs=-Infinity;for(const q of pool){if(selected.some(x=>x.id===q.id))continue;const v=score(q,selected);if(v>bs){best=q;bs=v}}if(!best)break;selected.push(best);pool.splice(pool.indexOf(best),1)}return selected}
 global.TTD_PRODUCTION_SESSION_V1={buildPool,createSession,shuffle};
})(window);
