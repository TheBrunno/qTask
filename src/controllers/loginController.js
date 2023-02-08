const Login = require('./../models/LoginModel');

exports.index = (req, res) => {
  res.render('signin')
}

exports.login = async (req, res) => {
  const login = new Login(req.body);
  const user = await login.login();

  if(login.errors.length > 0){
    req.session.save(() => {
      res.redirect('back');
      return;
    })
    return;
  }

  req.session.user = user;
  req.session.save(() => {
    return res.redirect('/myaccount')
  })
}