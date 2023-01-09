const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
  constructor(body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register(){
    this.check('signup');
    if(this.errors.length > 0) return;

    if(await this.userAlreadyRegistered(this.body)){
      this.errors.push('Usuario já existe.');
      return;
    };

    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);
    
    this.user = LoginModel.create(this.body);
  }

  check(type){
    this.cleanUp();

    if(type === 'signup'){
      if(!this.body.firstname) this.errors.push('Insira um nome valido.');
      if(!this.body.lastname) this.errors.push('Insira um sobrenome valido.');
      if(isNaN(this.body.age)) this.errors.push('Insira uma idade valida.');
    }
    if(!validator.isEmail(this.body.email)) this.errors.push('Insira um e-mail valido.');
    if(this.body.password.length <= 5 || this.body.password.length > 100) this.errors.push('Insira uma senha entre 6 e 100 caracteres.');
  }
  
  cleanUp(){
    for(let key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }
  }
  
  async userAlreadyRegistered(){
    return await LoginModel.findOne({ email: this.body.email });
  }

  async login(){
    this.check();
    if(this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });

    if(!this.user){
      this.errors.push('O e-mail ou a senha está incorreto.');
      return;
    }

    if(!bcrypt.compareSync(this.body.password, this.user.password)){
      this.errors.push('O e-mail ou a senha está incorreto.');
      this.user = null;
      return;
    }

    return this.user;
  }
}

module.exports = Login;