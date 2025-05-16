export default function handler(req, res) {
  const header = {
    alg: "HS256",
    typ: "JWT",
    kid: "68261dae6ab8fa0001a116bb"
  };

  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 5 * 60,
    aud: "/admin/"
  };

  const base64url = (str) =>
    Buffer.from(JSON.stringify(str))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const unsignedToken = base64url(header) + "." + base64url(payload);

  const crypto = require("crypto");
  const secret = Buffer.from("305710084c895aa9f34bbd49361a7f8c1829033f95acd4e1dcecab766033efa3", "hex");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const token = unsignedToken + "." + signature;

  res.status(200).json({ token });
}