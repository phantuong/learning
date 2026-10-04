/* TTD Publish Manifest v1 — explicit allow-list for production question banks */
(function(global){
 const manifest={version:'1.0.0',status:'review',banks:[],rules:{requireValidation:true,requireUniqueAnswer:true,rejectExactDuplicate:true,rejectNearDuplicate:true,minChoices:4}};
 function addBank(name,questions){manifest.banks.push({name,count:questions.length,ids:questions.map(q=>q.id)})}
 function build(banks){manifest.banks=[];Object.keys(banks).forEach(k=>{if(Array.isArray(banks[k]))addBank(k,banks[k])});manifest.total=manifest.banks.reduce((n,b)=>n+b.count,0);return manifest}
 global.TTD_PUBLISH_MANIFEST_V1={manifest,build};
})(window);
