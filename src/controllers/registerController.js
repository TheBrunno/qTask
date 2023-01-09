const Login = require('./../models/LoginModel');

exports.index = (req, res) => {
  res.render('signup');
}

exports.register = async (req, res) => {
  try{
    const login = new Login(req.body);
    await login.register();
    console.log(login.errors);
    if(login.errors.length > 0){
      req.flash('errors', login.errors);
      req.session.save(() => {
        res.redirect('/');
        return;
      });
      return;
    }
  
    req.session.save(() => {
      res.redirect('/myaccount');
      return;
    })
  }catch(e){
    console.log(e);
  }
}