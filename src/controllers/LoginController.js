import jwt from 'jsonwebtoken'

exports.login = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  //const validPassword = await bcrypt.compare(password, user[0].password)

  const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, { expiresIn: 86400 })
  const refreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 525600 })

  res.cookie('JWT', accessToken, {
    maxAge: 86400000,
    httpOnly: true
  })

  res.send({ accessToken, refreshToken })
};

exports.refresh = async (req, res) => {
  const refreshToken = req.body.token

  if (!refreshToken) {
    return res.status(401)
  }

  try{
    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  } catch(err) {
    return res.sendStatus(403)
  }

  const accessToken = jwt.sign({ id:1}, process.env.TOKEN_SECRET, {expiresIn: 86400})

  res.send({ accessToken })
};