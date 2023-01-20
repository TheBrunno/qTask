const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  description: { type: String, required: false },
  priority: { type: String, required: true },
  state: { type: String, required: true },
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

    await TaskModel.create(this.body);
  }

  static async edit(id){
    await TaskModel.findByIdAndUpdate(id, { state: 'done' });
  }
  static async remove(id){
    await TaskModel.findByIdAndUpdate(id, { state: 'pending' });
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
    if(!this.body.state) this.state = 'pending';
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