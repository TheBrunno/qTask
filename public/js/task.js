class TaskValidator{
  async getAllValues(){
    this.name = document.querySelector('input[name="taskname"]').value;
    this._csrf = document.querySelector('input[name="_csrf"').value;
    this.description = document.querySelector('textarea[name="description"]').value;
    this.getPriority();
    await this.send();
  }
  async send(){
    const data = {
      _csrf: this._csrf,
      taskname: this.name,
      description: this.description,
      priority: this.priority
    }
    const url = '/mytasks/create';

    axios.post(url, data)
    .then(async res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  getPriority(){
    const local = document.querySelector('.active-priority');
    if(!local){
      this.priority = 1;
      return;
    }
    this.priority = local.textContent.replace('flag', '');
    console.log(this.priority);
  }
}

const validator = new TaskValidator();

document.addEventListener('submit', e => {
  e.preventDefault();
  const body = validator.getAllValues();
})