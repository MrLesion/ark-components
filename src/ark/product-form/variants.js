import { BaseArkElement } from '../base';
import { parseAttribute } from '../base/utillities';

class arkVariants extends BaseArkElement{
    static get observedAttributes() {
        return ['variant-id'];
    }

    get variantId() {
        return parseAttribute(this.getAttribute('variant-id'));
    }

    set variantId(value) {
        this.setAttribute('variant-id', value)
    }
    
    constructor() {
        super();
    }
    
    attributeChangedCallback( name, oldValue, newValue ) {
        if(oldValue === null || oldValue === newValue){
            return;
        }
        if(name === 'variant-id'){
            
        }
    }
}

if(!customElements.get('ark-variants')){
    customElements.define('ark-variants', arkVariants);
}