class Warning{
    #warning;

    constructor(document){
        this.document = document;
    }

    create(message){
        this.destroy()

        this.#warning = this.document.createElement('div');
        const container = this.document.createElement('div');
        const p = this.document.createElement('p');
        const closeButton = this.document.createElement('div');

        p.innerText = message;
        closeButton.innerText = 'X'
        this.#warning.setAttribute('class', 'warning');

        container.append(p, closeButton);
        this.#warning.appendChild(container)
        this.document.body.appendChild(this.#warning);
        
        closeButton.addEventListener('click', () => this.destroy());
    }   

    get getHTMLElement(){
        return this.#warning;
    }

    destroy(){
        if(this.#warning){
            this.#warning.remove();
        }
    }
}

export default Warning;
