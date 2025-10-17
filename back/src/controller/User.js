const User = require('../model/User');
const hashcode = require('../lib/hashcode');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const EXPIRES = process.env.JWT_EXPIRES;

exports.create = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (username.trim() == '' || password.trim() == '') {
      throw new Error('Usuário ou senha em branco!');
    }

    User.create(username, await hashcode.generate(password));

    res.json({ success: true });
  }
  catch (err) {
    console.error(err)
    res.json({ success: false });
  }
}

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (username.trim() == '' || password.trim() == '') {
      throw new Error('Usuário ou senha em branco!');
    }
    const user = User.get(username);

    if (!user) throw new Error('Usuário ou senha incorreta')

    if (await hashcode.isMatch(password, user.password)) {
      
      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET,
        { expiresIn: String(EXPIRES)+'h' }
      );
      res.cookie('authorization', token, {
        maxAge: EXPIRES * 1000 * 60 * 60,
        sameSite: 'lax',
        secure: false,
        httpOnly: true
      })

      res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          createdAt: user.created_at
        },
      });
    }
    else throw new Error('Usuário ou senha incorreta');
  }
  catch (err) {
    console.error(err)
    res.json({ success: false, data: null });
  }
}