const { decryptSecret } = require("./secret-encrypt");

exports.handler = async (event) => {
  const secret1 = await decryptSecret("var01");
  const secret2 = await decryptSecret("var02");
  const arms = await decryptSecret("ARMS");

  return `var: '${secret1}' var 2: '${secret2}', text from secrets:  ARMS: ${arms}`;
};
