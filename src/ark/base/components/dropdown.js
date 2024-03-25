import { BaseArkElement } from '../index';
import { parseAttribute } from '../utillities';

const template = document.createElement('template');
template.innerHTML = `
    <button></button>
    <div>
        <slot></slot>
    </div>
`

class arkDropdown extends BaseArkElement{
    static get observedAttributes() {
        return ['title'];
    }

    get title() {
        return parseAttribute(this.getAttribute('title'));
    }

    set title(value) {
        this.title = value;
        this.buttonElement.textContent = this.title;
    }
    
    constructor() {
        super();
        if(!this.querySelector('template')){
            this.template = template;
        } else{
            this.template = this.querySelector('template');
        }

        this.buttonElement = this.querySelector('button');
        this.buttonElement.innerText = this.title;
        this.buttonElement.addEventListener('click', this.toggle, false)

        this.contentElement = this.querySelector('div');
        this.contentElement.style.display = 'none';
        
        this.show = false;
        
        this.appendChild(this.template.content.cloneNode(true));
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        if(oldValue === null || oldValue === newValue){
            return;
        }
        if(name === 'title'){
            this.title = newValue;
        }
    }
    
    toggle(){
        this.show = !this.show;
        this.contentElement.style.display = this.show ? 'block' : 'none';
        this.dispatchEvent(new CustomEvent('ark.dropdown.toggle', {detail: this.show}))
    }
}

if(!customElements.get('ark-dropdown')){
    customElements.define( 'ark-dropdown', arkDropdown );
}