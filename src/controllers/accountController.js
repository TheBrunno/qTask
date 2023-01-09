exports.index = (req, res) => {
  res.render('myaccount', { user: req.session.user });
}

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}