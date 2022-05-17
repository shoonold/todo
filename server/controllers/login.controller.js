const fs = require('fs')
const jwt = require('jsonwebtoken')

module.exports = {
  async login (req, res) {
    let users = fs.readFileSync('./data/users.json')
    users = users.length ? JSON.parse(users) : []
    const user = users.filter(
      element =>
        element.userName == req.body.userName &&
        element.password == req.body.password
    )

    if (!user.length) {
      res.send({
        success: false,
        msg: `Invalid username or password`
      })
    } else {
      const token = jwt.sign(
        { userName: req.body.userName },
        process.env.SECRET_KEY,
        {
          expiresIn: '7d'
        }
      )
      res.send({
        success: true,
        token: token,
        userName: req.body.userName,
        msg: 'User logged in successfully'
      })
    }
  }
}
