(function(){'use strict';
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='english.html'&&page!=='voca-scramble.html')return;

  function getWords(){
    const cloud=Array.isArray(window.__cloudVocabularyWords)?window.__cloudVocabularyWords:[];
    if(cloud.length)return [...new Set(cloud.map(w=>String(w||'').trim().toLowerCase()).filter(Boolean))];
    try{
      const raw=JSON.parse(localStorage.getItem('grade1EnglishSelectedWords')||'[]');
      return [...new Set((Array.isArray(raw)?raw:[]).map(x=>typeof x==='string'?x:(x&&x.word)||'').map(w=>String(w).trim().toLowerCase()).filter(Boolean))];
    }catch(e){return[]}
  }

  function shuffleRound(words,previousFirst){
    const source=[...words];
    if(source.length<2)return source;
    let result=shuffle(source),guard=0;
    while(previousFirst&&result[0]===previousFirst&&guard<8){result=shuffle(source);guard++}
    return result;
  }

  function hideProgress(){
    if(document.getElementById('vocab-games-no-progress'))return;
    const style=document.createElement('style');
    style.id='vocab-games-no-progress';
    style.textContent='.progress,#progressBar{display:none!important}';
    (document.head||document.documentElement).appendChild(style);
  }

  function patchEnglish(){
    if(typeof window.nextQuestion!=='function')return false;
    window.nextQuestion=function(){
      if(!state.answered)return;
      if(state.index<state.queue.length-1){
        state.index++;
        renderQuestion();
        return;
      }
      // Đã đi hết toàn bộ từ được chọn: bắt đầu vòng mới với thứ tự mới.
      // Không giới hạn 10 câu và không reset điểm.
      const previousFirst=state.queue[0];
      state.queue=shuffleRound(state.words,previousFirst);
      state.index=0;
      renderQuestion();
    };
    return true;
  }

  function patchScramble(){
    if(typeof window.start!=='function')return false;
    window.start=function(){
      const words=getWords();
      if(!words.length){
        allWords=[];
        const setup=document.getElementById('setupText');
        if(setup)setup.textContent='Chưa có từ thuộc nguồn đã chọn.';
        return;
      }
      allWords=words;
      score=0;
      qi=0;
      make();
      document.getElementById('setup')?.classList.add('hidden');
      document.getElementById('game')?.classList.remove('hidden');
      document.getElementById('done')?.classList.add('hidden');
      render();
    };
    window.__continuousScramblePatched=true;
    const start=document.getElementById('startBtn');
    if(start)start.onclick=window.start;
    const restart=document.getElementById('restartBtn');
    if(restart)restart.onclick=window.start;

    // Mỗi vòng đi qua toàn bộ từ được chọn đúng 1 lần, sau đó tự xáo trộn và chạy vòng mới.
    window.make=function(){
      const previousFirst=questions[0]?.word;
      const p=shuffleRound(allWords,previousFirst);
      questions=p.map(w=>({word:String(w).toLowerCase(),letters:shuffle(String(w).toLowerCase().split(''))}));
    };
    const next=document.getElementById('nextBtn');
    if(next){
      next.onclick=function(){
        qi++;
        if(qi>=questions.length){
          qi=0;
          make();
        }
        render();
      };
    }
    const game=document.getElementById('game');
    if(game){
      const scoreEl=game.querySelector('.score');
      if(scoreEl){
        const old=scoreEl.innerHTML;
        scoreEl.innerHTML=old.replace(/<span id="qNo">1<\/span>\/10/, '<span id="qNo">1</span>/<span id="qTotal">0</span>');
      }
    }
    return true;
  }

  function applyScrambleTotal(){
    if(page!=='voca-scramble.html')return;
    const total=document.getElementById('qTotal');
    if(total)total.textContent=(Array.isArray(window.__cloudVocabularyWords)?window.__cloudVocabularyWords.length:(Array.isArray(window.allWords)?window.allWords.length:0));
    const score=document.querySelector('.score');
    if(score&&!score.textContent.includes('/10')){
      const n=document.getElementById('qNo');
      if(n){
        let totalEl=document.getElementById('qTotal');
        if(!totalEl){totalEl=document.createElement('span');totalEl.id='qTotal';const parts=score.childNodes;for(let i=0;i<parts.length;i++){if(parts[i].nodeType===3&&parts[i].textContent.includes('/10')){parts[i].textContent=parts[i].textContent.replace('/10','/');score.insertBefore(totalEl,parts[i].nextSibling);break}}}
        if(totalEl)totalEl.textContent=(window.__cloudVocabularyWords||window.allWords||[]).length||0;
      }
    }
  }

  function patch(){
    hideProgress();
    if(page==='english.html')patchEnglish();
    if(page==='voca-scramble.html')patchScramble();
    applyScrambleTotal();
  }

  window.addEventListener('vocabularySelectedWordsChanged',function(){setTimeout(patch,0)});
  window.addEventListener('DOMContentLoaded',function(){
    patch();
    setTimeout(patch,250);
    setTimeout(patch,1000);
  });
  setTimeout(patch,0);
  setTimeout(patch,300);
  setTimeout(patch,1200);
})();
