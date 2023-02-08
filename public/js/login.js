const form = document.querySelector('form');

form.addEventListener('submit', e => {

    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const validate = new Validate([
        {content: email, type: 'text'},
        {content: password, type: 'password'}
    ]);
    
    if(!validate.error){
        form.submit();
        return;
    }

    const errors = document.querySelectorAll('.error');

    errors.forEach(error => {
        error.style.display = 'block';
    })

});