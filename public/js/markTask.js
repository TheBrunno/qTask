class Mark{
  static async done(local){
    const taskID = local.getAttribute('data-taskid');
    const csrfToken = local.getAttribute('data-csrf');
    let mode = local.classList.contains('done') ? 'remove' : 'done';

    await axios.post(`/mytasks/${mode}`, { _id: taskID, _csrf: csrfToken })
    .then(response => console.log(response))
    .catch(err => console.log(err));

    local.classList.toggle('done');
  }
}