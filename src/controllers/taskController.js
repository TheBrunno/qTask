exports.index = (req, res) => {
  res.render('task', { user: req.session.user })
}

exports.create = (req, res) => {
  console.log('create');
}