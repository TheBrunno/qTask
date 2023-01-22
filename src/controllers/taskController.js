const Task = require('../models/TaskModel');

exports.index = async (req, res) => {
  const tasks = await Task.get(req.session.user._id);
  
  const _tasks = [];
  for(let c=1; c<=5; c++){
    for(let i in tasks){
      if(tasks[i].priority == c) _tasks.push(tasks[i]);
    }
  }

  res.render('task', { user: req.session.user, tasks:_tasks, order: ['one', 'two', 'three', 'four', 'five'] });
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
      });
      return;
    }
    next();
  }catch(e){
    console.log(e);
  }
}

exports.edit = async (req, res, next) => {
  await Task.edit(req.body.taskname, req.body.description);
  next();
}

exports.remove = async (req, res, next) => {
  await Task.remove(req.body.taskname, req.body.description);
  next();
}

exports.delete = async (req, res, next) => {
  await Task.delete(req.body.taskname, req.body.description);
  next();
} 