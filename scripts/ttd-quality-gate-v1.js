const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'),c={console,window:{}};c.global=c;vm.createContext(c);
function load(f){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error(`Missing ${f}`);vm.runInContext(fs.readFileSync(p,'utf8'),c,{filename:f});}
['ttd-shape-pattern-grammar-v3.js','ttd-shape-pattern-solver-v1.js','ttd-pattern-semantic-v1.js','ttd-visual-contract-v1.js'].forEach(load);
const qs=c.TTD_SHAPE_PATTERN_GRAMMAR_V3.generate(1000),failures=[],ids=new Set();
for(const q of qs){const checks={uniqueId:!ids.has(q.id),fourChoices:Array.isArray(q.choices)&&q.choices.length===4,fourVisualChoices:Array.isArray(q.visual?.choiceVisuals)&&q.visual.choiceVisuals.length===4,visualContract:c.TTD_VISUAL_CONTRACT_V1.validate(q).valid,solver:c.TTD_SHAPE_PATTERN_SOLVER_V1.validate(q).valid};ids.add(q.id);for(const[k,v]of Object.entries(checks))if(!v)failures.push({id:q.id,check:k});}
const semantic=c.TTD_PATTERN_SEMANTIC_V1.analyze(qs);const result={status:failures.length||semantic.exactDuplicates.length?'FAIL':'PASS',generated:qs.length,uniqueIds:ids.size,failures:failures.slice(0,50),exactDuplicateGroups:semantic.exactDuplicates.length,structuralDuplicateGroups:semantic.structuralDuplicates.length};console.log(JSON.stringify(result,null,2));if(result.status==='FAIL')process.exit(1);
