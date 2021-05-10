const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });
const kms = new AWS.KMS();

const decrypted = {};

exports.decryptSecret = async (secretName) => {
  if (decrypted[secretName]) {
    console.log("returning cached " + secretName);
    return decrypted[secretName];
  }
  console.log("decrypting " + secretName);
  try {
    const req = {
      CiphertextBlob: Buffer.from(process.env[secretName], "base64"),
      KeyId:
        "arn:aws:kms:sa-east-1:267693165925:key/b988d473-b222-4ac8-8988-7c7fc4842db5",
    };
    const data = await kms.decrypt(req).promise();
    const decryptedVal = data.Plaintext.toString("ascii");
    decrypted[secretName] = decryptedVal;
    return decryptedVal;
  } catch (err) {
    console.log("decrypt error:", err);
    throw err;
  }
};
