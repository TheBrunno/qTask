class Validate{
    constructor(locals){
        this.locals = [...locals];
        this.error = false;

        this.locals.forEach(el => {
            if(el.type === 'text') this.textValidator(el.content) ;
            if(el.type === 'password') this.passwordValidator(el.content);
            if(el.type === 'age') this.ageValidator(el.content);
        })
    }

    textValidator(content){
        return this.error = !content;
    }

    passwordValidator(content){
        return this.error = (content.length <= 5 || content.length > 100);
    }

    ageValidator(content){
        return validator.isNumeric(content) && content < 150 && content > 5;
    }

}