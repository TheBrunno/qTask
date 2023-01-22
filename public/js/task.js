class TaskValidator{
  async getAllValues(){
    this.name = document.querySelector('input[name="taskname"]').value.trim();
    this._csrf = document.querySelector('input[name="_csrf"').value;
    this.description = document.querySelector('textarea[name="description"]').value.trim();
    this.clearFields();
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
    .then()
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
  }
    
  clearFields(){
    document.querySelector('textarea[name="description"]').value = '';
    document.querySelector('input[name="taskname"]').value = '';
  }
}

const validator = new TaskValidator();

document.addEventListener('submit', async e => {
  e.preventDefault();
  const taskViewLocal = document.querySelector('.taskView');
  const body = await validator.getAllValues();
  const tasknames = document.querySelectorAll('.taskname');
  const descriptions = document.querySelectorAll('.description-view');
  const order = ['one', 'two', 'three', 'four', 'five'];
  let tasknameExists = false;
  let elementExist = false;

  for(let i=0; i<tasknames.length; i++){
    if(body.taskname === tasknames[i].innerText && body.description === descriptions[i].innerText){
      console.log('Essa tarefa já existe, escolha outro nome.');
      tasknameExists = true;
    };
  }

  if(!tasknameExists){
    const local = document.querySelector(`.${order[body.priority-1]}Priority`);
    local.innerHTML += `
    <div class="taskBox priority-${order[body.priority-1]}" onclick="Mark.done(this)" data-csrf="${body._csrf}">
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
      <div class="delete-flag" onclick="Mark.delete(this.parentElement)"><span class="material-symbols-outlined">delete</span></div>
    </div>`;

    const old = document.querySelector('.first-instructions');
    const now = document.querySelector('.second-instructions');
    if(old) old.remove();
    if(!now){
      const instruction = document.createElement('p');
      instruction.classList.add('instructions', 'second-instructions');
      instruction.innerHTML = 'Para marcar uma tarefa como <span class="done-word">concluída</span>, clique na mesma.';
      document.querySelector('.taskView').insertAdjacentElement('afterbegin', instruction);
    };
  };
})