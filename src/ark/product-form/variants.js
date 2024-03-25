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
        
        this.querySelectorAll('ark-choice').forEach(c => c.addEventListener('ark.choice.change', this, false))
    }
    
    attributeChangedCallback( name, oldValue, newValue ) {
        if(oldValue === null || oldValue === newValue){
            return;
        }
        if(name === 'variant-id'){
            this.querySelector('input[name="VariantID"]').value = newValue;
        }
    }
    
    handleEvent( event ) {
        super.handleEvent( event );
        switch ( event.type ) {
            case 'ark.choice.change':
                this.setvariantId();
        }
    }

    setvariantId(){
        const value = Array.from(this.querySelectorAll('ark-choice')).map(a => a.getAttribute('value')).join('.');
        this.variantId = value;
    }
}

if(!customElements.get('ark-variants')){
    customElements.define('ark-variants', arkVariants);
}