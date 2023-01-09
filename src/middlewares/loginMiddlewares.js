exports.csurfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}

exports.checkCSURFerror = (err, req, res, next) => {
  if(err) return res.render('index');
  next();
}

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) return res.redirect('/');
  next();
}