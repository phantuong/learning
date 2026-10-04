const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');const context={console,window:{}};context.global=context;vm.createContext(context);
function load(f){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error(`Missing ${f}`);vm.runInContext(fs.readFileSync(p,'utf8'),context,{filename:f});}
['ttd-visual-contract-v1.js','ttd-shape-pattern-generator-v1.js','ttd-shape-renderer-v1.js'].forEach(load);
const qs=context.TTD_SHAPE_PATTERN_GENERATOR_V1.generate(100);let failed=[];
for(const q of qs){const r=context.TTD_VISUAL_CONTRACT_V1.validate(q);if(!r.valid)failed.push({id:q.id,errors:r.errors});if(!q.visual?.choiceVisuals||q.visual.choiceVisuals.length!==4)failed.push({id:q.id,errors:['four_visual_choices_required']});}
console.log(JSON.stringify({status:failed.length?'FAIL':'PASS',total:qs.length,failed},null,2));if(failed.length)process.exit(1);
