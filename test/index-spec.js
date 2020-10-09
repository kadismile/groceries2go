const { churchTest } = require("./church-test.js");
const { authTest } = require("./auth-test.js");

(async function() {
  try {
    await churchTest();
    await authTest();
  } catch (e) {
    console.log(e)
  }
  
})();