/* TTD Spatial Reasoning Engine v1 — position and rotation reasoning. */
const DIR=['N','E','S','W'];
function rotate(dir,steps){const i=DIR.indexOf(dir);return DIR[(i+steps)%4]}
function solvePosition(a,b,steps){return rotate(a,steps)===b}
function solveRotation(items,steps){return items.map(x=>({...x,rotation:((x.rotation||0)+steps)%4}))}
function inferRotation(a,b){return ((b.rotation||0)-(a.rotation||0)+4)%4}
module.exports={rotate,solvePosition,solveRotation,inferRotation};
