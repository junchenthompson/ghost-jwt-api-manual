module.exports = (req, res) => {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 5 * 60,
  };

  const token = [
    'header',
    Buffer.from(JSON.stringify(payload)).toString('base64url'),
    'signature',
  ].join('.');

  res.status(200).json({ token });
};
