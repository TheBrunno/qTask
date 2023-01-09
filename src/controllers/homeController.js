exports.index = (req, res) => {
  res.render('index', { user: req.session.user || undefined  });
}