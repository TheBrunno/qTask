const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  description: { type: String, required: false },
  priority: { type: String, required: true },
  userId: { type: String, required: true }
});

const TaskModel = mongoose.model('Task', TaskSchema);

class Task{
  constructor(body, userID){
    this.body = {...body, userId: userID};
    this.errors = [];
  }

  async create(){
    this.check();

    if(this.errors.length > 0) return;

    TaskModel.create(this.body);
  }

  static async get(userID){
    return await TaskModel.find({ userId: userID });
  }

  check(){
    this.cleanUp();

    if(!this.body.taskname) this.errors.push('Insira uma tarefa valida.');
    if(this.body.taskname.length > 200) this.errors.push('Quantidade de caracteres excedida.');
    if(this.body.description.length > 500) this.errors.push('Quantidade de caracteres excedida.');
    if(!this.body.priority) this.body.priority = '5';
  }

  cleanUp(){
    for(let key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }
  }
}

module.exports = Task;