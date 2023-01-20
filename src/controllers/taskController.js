const Task = require('../models/TaskModel');

exports.index = async (req, res) => {
  const tasks = await Task.get(req.session.user._id);
  res.render('task', { user: req.session.user, tasks });
}

exports.create = async (req, res, next) => {
  try{
    const task = new Task(req.body, req.session.user._id);
    await task.create();
    if(task.errors.length > 0){
      req.flash('errors', task.errors);
      req.session.save(() => {
        res.redirect('/');
        return;
      })
    }
    next();
  }catch(e){
    console.log(e);
  }
}

exports.edit = async (req, res, next) => {
  await Task.edit(req.body._id);
  next();
}

exports.remove = async (req, res, next) => {
  await Task.remove(req.body._id);
  next();
}