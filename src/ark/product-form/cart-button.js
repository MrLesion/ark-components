import { BaseArkFormElement } from '../base';
import {parseAttribute} from '../base/utillities'

export class arkCartButton extends BaseArkFormElement{

    get endpoint() {
        return parseAttribute(this.getAttribute('endpoint'));
    }

    constructor() {
        super();
        this.internals = this.attachInternals();
        this.setValue('');
        this.setAttribute('is-busy', false);
    }

    setValue(v) {
        this.value = v;
        this.internals.setFormValue(v);

    }

    connectedCallback(){
        this.addEventListener('click', this, false);
    }

    handleEvent(event){
        if(event.type === 'click'){
            this.setAttribute('is-busy', true)
            this.addToCart().then(() =>{
                console.log('callback');
                setTimeout(() =>{
                    this.setAttribute('is-busy', false)
                }, 500)
            })
        }
    }
    async addToCart(){
        
        return fetch(this.endpoint,{
            method: 'post',
            body: new FormData(this.form)
        }).then(resp => resp.text());
    }

}

if(!customElements.get('ark-cart-button')) {
    customElements.define( 'ark-cart-button', arkCartButton );
}