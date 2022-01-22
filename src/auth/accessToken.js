const jwt = require('jsonwebtoken'),
dotenv = require('dotenv');

// get config vars
dotenv.config();

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

  try {
    let user = jwt.verify(token, process.env.TOKEN_SECRET)
    

    req.user = user
    next()

  } catch (error) {
    debugger
    throw new Error(error)
  }
  
}

module.exports.generateAccessToken = (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, {
    expiresIn: '90 days'
  });
}