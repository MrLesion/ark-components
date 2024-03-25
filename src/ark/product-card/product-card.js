import { BaseArkElement } from '../base';
import '../product-form/cart-button'
import { parseAttribute } from '../base/utillities';

class arkProductCard extends BaseArkElement{

    get link() {
        return parseAttribute(this.getAttribute('link'));
    }
    
    constructor() {
        super();
        this.addEventListener('click', this, false);
        this.addEventListener('mouseover', this, false);
        this.addEventListener('mouseleave', this, false);
    }
    connectedCallback() {
        
    }
    
    handleEvent( event ) {
        switch ( event.type ){
            case 'click':
                if(!event.target.form && this.link){
                    location.href = this.link;
                }
                break;
            case 'mouseover':
                if(this.link){
                    this.style.cursor = 'pointer';
                }
                break;
            case 'mouseleave':
                if(this.link){
                    this.style.cursor = '';
                }
                break;
        }
    }
}

if(!customElements.get('ark-product-card')){
    customElements.define( 'ark-product-card', arkProductCard );
}
