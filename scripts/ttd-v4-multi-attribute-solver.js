/* TTD v4 Multi-Attribute Solver — independent solver for coupled shape/color grids. */
function eq(a,b){return JSON.stringify(a)===JSON.stringify(b)}
function cycle(vals){for(let k=1;k<=Math.floor(vals.length/2);k++){let ok=true;for(let i=0;i<vals.length;i++)if(!eq(vals[i],vals[i%k])){ok=false;break}if(ok)return k}return null}
function infer(sequence){if(sequence.length<4)return[];const out=[],n=sequence.length;for(const key of ['shape','color','size']){const vals=sequence.map(x=>x[key]),k=cycle(vals);if(k)out.push({rule:`${key}_cycle_${k}`,answer:{...sequence[n-1],[key]:vals[n%k]}})}
 // Detect row-major Cartesian product: shape cycles fastest, then color.
 const shapes=[...new Set(sequence.map(x=>x.shape))],colors=[...new Set(sequence.map(x=>x.color))];
 if(shapes.length>1&&colors.length>1){const sameOrder=sequence.every((x,i)=>i<shapes.length*colors.length?x.shape===shapes[i%shapes.length]&&x.color===colors[Math.floor(i/shapes.length)%colors.length]:true);if(sameOrder){const nextIndex=n%(shapes.length*colors.length);out.push({rule:'cartesian_shape_color',answer:{shape:shapes[nextIndex%shapes.length],color:colors[Math.floor(nextIndex/shapes.length)%colors.length],size:sequence[n-1].size}})}}
 return out;
}
function unique(c){const m=new Map();for(const x of c)m.set(JSON.stringify(x.answer),x.rule);return [...m].map(([answer,rule])=>({answer:JSON.parse(answer),rule}));}
if(typeof module!=='undefined')module.exports={infer,unique};
