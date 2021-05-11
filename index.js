const { decryptSecret } = require("./secret-encrypt");

exports.handler = async () => {
  const secret1 = process.env.var01;
  const secret2 = process.env.var01;
  const { ARMS } = await decrypt(["ARMS"]);

  return `var: '${secret1}' var 2: '${secret2}', text from secrets:  ARMS: ${ARMS}`;
};

async function decrypt(variables) {
  const data = {
    cmk: process.env.AWS_CMK_ARN,
    encryptedValues: {},
  };

  for (const name of variables) {
    data.encryptedValues[name] = process.env[name];
  }

  const url = "https://x5z10sp02c.execute-api.sa-east-1.amazonaws.com/test";
  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return request.json;
}
