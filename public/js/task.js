class TaskValidator{
  async getAllValues(){
    this.name = document.querySelector('input[name="taskname"]').value;
    this._csrf = document.querySelector('input[name="_csrf"').value;
    this.description = document.querySelector('textarea[name="description"]').value;
    this.getPriority();
    await this.send();
    return this.data;
  }
  async send(){
    this.data = {
      _csrf: this._csrf,
      taskname: this.name,
      description: this.description,
      state: 'pending',
      priority: this.priority
    }
    const url = '/mytasks/create';

    await axios.post(url, this.data)
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

document.addEventListener('submit', async e => {
  e.preventDefault();
  const taskViewLocal = document.querySelector('.taskView');
  const body = await validator.getAllValues();
  const tasknames = document.querySelectorAll('.taskname');
  let tasknameExists = false;
  
  tasknames.forEach(taskname => {
    if(body.taskname === taskname.innerText){
      console.log('Essa tarefa já existe, escolha outro nome.');
      tasknameExists = true;
    };
  });

  if(!tasknameExists){
    taskViewLocal.innerHTML += `
    <div class="taskBox" onclick="Mark.done(this)" data-csrf="${body._csrf}">
      <div class="done-flag"><span class="material-symbols-outlined">done</span></div>
      <div class="taskname-view">
        <h3 class="taskname">${body.taskname}</h3>
      </div>
      <div class="description-view">
        <p>
          ${body.description}
        </p>
      </div>
      <div class="priority-view">${body.priority}<span class="material-symbols-outlined">flag</span></div>
    </div>`
  };
})