const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({
    error: {
      state: true,
      errorCode: 401,
      errorMessage: "authentication error",
      errors: []
    },
    message: "you are not autherized!",
    data: []
  })

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) next(err)

    req.user = user

    next()
  })
}

module.exports.generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: '1800s'
  });
}