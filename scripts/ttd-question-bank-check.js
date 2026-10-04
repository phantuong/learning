/* TTD Question Bank CI-style check. */
const validate=require('./ttd-question-bank-validator');
function check(bank,name='question-bank'){const result=validate(bank);if(!result.ok){console.error(`[TTD] ${name} FAILED`);result.errors.forEach(x=>console.error(' - '+x));process.exitCode=1;return false}console.log(`[TTD] ${name} PASS: ${result.total} questions`);result.warnings.forEach(x=>console.warn(' - '+x));return true}
module.exports={check};
if(require.main===module)console.log('[TTD] Validator loaded. Import a bank and call check(bank).');
