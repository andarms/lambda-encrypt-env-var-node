const { decryptSecret } = require("./secret-encrypt");

exports.handler = async (event) => {
  const secret1 = await decryptSecret("var01");
  const secret2 = await decryptSecret("var02");

  return `ssshhh! The secrets are: secret1: '${secret1}' secret 2: '${secret2}'`;
};
