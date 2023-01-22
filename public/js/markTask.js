class Mark{
  static async done(local){
    const taskname = local.querySelector('.taskname').innerText;
    const csrfToken = local.getAttribute('data-csrf');
    let mode = local.classList.contains('done') ? 'remove' : 'done';

    await axios.post(`/mytasks/${mode}`, { taskname, _csrf: csrfToken })
    .then(response => console.log(response))
    .catch(err => console.log(err));

    local.classList.toggle('done');
  }

  static async delete(local){
    const taskname = local.querySelector('.taskname').innerText;
    const csrfToken = local.getAttribute('data-csrf');

    await axios.post(`/mytasks/delete`, { taskname, _csrf: csrfToken })
    .then(response => console.log(response))
    .catch(err => console.log(err));

    local.remove();

    console.log(document.querySelector('.taskView').childElementCount);
    if(document.querySelector('.taskView').childElementCount === 1){
      document.querySelector('.second-instructions').remove();
      const instruction = document.createElement('p');
      instruction.classList.add('instructions', 'first-instructions');
      instruction.innerHTML = 'Quando você criar tarefas elas aparecerão aqui.';
      document.querySelector('.taskView').insertAdjacentElement('afterbegin', instruction);
    }
  }
}