class Mark{
  static async done(local){
    const taskname = local.querySelector('.taskname').innerText.trim();
    const description = local.querySelector('.description-view p').innerText.trim();
    const csrfToken = local.getAttribute('data-csrf');
    console.log(taskname, description);
    let mode = local.classList.contains('done') ? 'remove' : 'done';

    await axios.post(`/mytasks/${mode}`, { taskname, description, _csrf: csrfToken })
    .then()
    .catch(err => console.log(err));

    local.classList.toggle('done');
  }

  static async delete(local){
    const taskname = local.querySelector('.taskname').innerText.trim();
    const description = local.querySelector('.description-view p').innerText.trim();
    const csrfToken = local.getAttribute('data-csrf');

    await axios.post(`/mytasks/delete`, { taskname, description, _csrf: csrfToken })
    .then()
    .catch(err => console.log(err));

    local.remove();

    const oneLocal = document.querySelector('.taskView .onePriority').childElementCount;
    const twoLocal = document.querySelector('.taskView .twoPriority').childElementCount;
    const threeLocal = document.querySelector('.taskView .threePriority').childElementCount;
    const fourLocal = document.querySelector('.taskView .fourPriority').childElementCount;
    const fiveLocal = document.querySelector('.taskView .fivePriority').childElementCount;

    if(!oneLocal && !twoLocal && !threeLocal && !fourLocal && !fiveLocal){
      document.querySelector('.second-instructions').remove();

      const instruction = document.createElement('p');

      instruction.classList.add('instructions', 'first-instructions');
      instruction.innerHTML = 'Quando você criar tarefas elas aparecerão aqui.';

      document.querySelector('.taskView').insertAdjacentElement('afterbegin', instruction);
    }
  }
}