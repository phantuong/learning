/* TTD Curriculum Bank Builder v1 — target-balanced generation across eight thinking groups. */
const G=require('./ttd-curriculum-matrix').matrix;const bank=require('./ttd-question-bank-builder');
function familiesFor(group,level){return G[group]?.levels?.[level]||[]}
function buildPlan({perLevel=80}={}){const groups=Object.keys(G),plan=[];for(let level=1;level<=3;level++)for(const group of groups){plan.push({group,level,target:Math.max(1,Math.round(perLevel/groups.length)),families:familiesFor(group,level)})}return plan}
function build({perLevel=80}={}){const plan=buildPlan({perLevel});const result=bank.build({perLevel:Math.ceil(perLevel/8)});const byGroup={};for(const item of plan)byGroup[item.group]=(byGroup[item.group]||[]).concat(item);return{status:result.status,plan,sourceBank:result.accepted,byLevel:result.byLevel,byFamily:result.byFamily,questions:result.questions}}
if(require.main===module)console.log(JSON.stringify(build({perLevel:Number(process.argv[2]||80)}),null,2));module.exports={buildPlan,build};
