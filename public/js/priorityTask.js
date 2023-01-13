class Priority{
  constructor(locals){
    this.locals = [...locals];
  }
  click(local){
    if(local.classList.contains('active-priority')) return;
    if(!local.classList.contains('priorities')) return;
    this.clearAll();
    this.add(local);
  }

  clearAll(){
    this.locals.forEach(e => {
      e.classList.remove('active-priority');
    })
  }

  add(local){
    local.classList.add('active-priority');
  }
}

const parent = document.querySelector('.priority-container');
const locals = document.querySelectorAll('.priorities');
const priority = new Priority(locals);

parent.addEventListener('click', e => {
  if(e.target.innerText === 'flag') priority.click(e.target.parentElement);
  else priority.click(e.target);
})