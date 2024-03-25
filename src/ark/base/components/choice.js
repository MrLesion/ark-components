import { BaseArkElement } from '../index';
import {mapAttributes, parseAttribute} from '../utillities';

const templates = {
    select: `<div class="ark-choice-option">
                {label}
                <input class="ark-choice-option-input" type="radio" name="{inputName}" value="{value}">
            </div>`,
    radio: `<div class="ark-choice-option">
                {label}
                <input class="ark-choice-option-input" type="radio" name="{inputName}" value="{value}">
            </div>`,
    checkbox: `<div class="ark-choice-option">
                {label}
                <input class="ark-choice-option-input" type="checkbox" name="{inputName}" value="{value}">
            </div>`,
}

class arkChoice extends BaseArkElement{
    static get observedAttributes() {
        return [''];
    }

    static get types() {
        return ['select', 'radio', 'checkbox'];
    }

    get type() {
        return parseAttribute(this.getAttribute('type'));
    }

    get inputName() {
        return parseAttribute(this.getAttribute('input-name'));
    }

    get value() {
        return parseAttribute(this.getAttribute('value'));
    }

    set value(value) {
        this.setAttribute('value', value);
    }
    
    constructor() {
        super();
        this.validateProperties();
        this.options = mapAttributes(this.querySelectorAll('slot'));
        this.buildOptions();
        this.querySelectorAll('.ark-choice-option-input').forEach( d => d.addEventListener('change', this, false));
    }
    
    buildOptions(){
        const template = document.createElement('template');
        const domParser = new DOMParser();
        
        this.options.forEach((optionEntry) =>{
            const optionDomElement = domParser.parseFromString(templates[this.type].replace('{label}', optionEntry.label).replace('{value}', optionEntry.value).replace('{inputName}', this.inputName || ''), 'text/html');
            if(this.value.includes(optionEntry.value)){
                optionDomElement.querySelector('.ark-choice-option-input').setAttribute('checked', true)
            }
            template.innerHTML = optionDomElement.documentElement.innerHTML;
            const option = template.content.cloneNode(true);
            this.appendChild(option);
        })
    }
    
    validateProperties(){
        if(!this.type || !arkChoice.types.includes(this.type)){
            throw new Error(`Type "${this.type}" not allowed. Try one of these: ${arkChoice.types.join(', ')}`)
        }
    }
    attributeChangedCallback( name, oldValue, newValue ) {
        if(oldValue === null || oldValue === newValue){
            return;
        }
    }
    
    handleEvent( event ) {
        super.handleEvent( event );
        
        switch ( event.type ) {
            case 'change':
                this.setSelectedValues();
                break;
        }
    }
    
    setSelectedValues(){
        const selectedValues = Array.from(this.querySelectorAll('.ark-choice-option-input')).filter(o => o.checked === true);
        this.value = selectedValues.map(o => o.value);
        this.emit('ark.choice.change', {value: this.value});
    }
}

if(!customElements.get('ark-choice')){
    customElements.define( 'ark-choice', arkChoice );
}