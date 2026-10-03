(()=>{
const names={circle:'Hình tròn',square:'Hình vuông',tri:'Hình tam giác',rect:'Hình chữ nhật'};
const fix=()=>document.querySelectorAll('#options .option').forEach(b=>{const v=b.dataset.v;if(names[v])b.textContent=names[v]});
new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});
fix();
})();
