import {Dropdown} from 'bootstrap';

class variantSelector extends HTMLElement{
    static get observedAttributes() {
        return ['variantCombination'];
    }
    
    get variantCombination() {
        return this.getAttribute('variant-combination');
    }

    set variantCombination(newValue) {
        this.setAttribute('variant-combination', newValue);
    }
    
    constructor() {
        super();
        const dropdownElementList = this.querySelectorAll('.dropdown-toggle')
        this.dropdowns = [...dropdownElementList].map(dropdownToggleEl => new Dropdown(dropdownToggleEl));
        this.dropdowns.forEach((dropdown) =>{
            const options = dropdown._menu.querySelectorAll('.js-variant-selector-option');
            options.forEach((option) =>{
                option.addEventListener('click', (event) =>{
                    this.handleEvent(event, dropdown)
                });
            });
        });
        this.updateSelectedValues();
    }

    connectedCallback(){
        //this.addEventListener('click', this, false);
    }

    handleEvent(event, arg){
        switch ( event.type ){
            case 'click':
                const dropdownOptions = arg._menu.querySelectorAll('.js-variant-selector-option');
                dropdownOptions.forEach(o => o.classList.remove('active'))
                event.target.classList.add('active');
                this.setVariantCombination();
                
        }
    }

    attributeChangedCallback(name, value, update) {
        if(value === null || value === update){
            return;
        }

        switch ( name ){
            case 'variantCombination':
                this.updateSelectedValues();
                break;
        }
    }
    
    setVariantCombination(){
        this.variantCombination = Array.from(this.querySelectorAll('.js-variant-selector-option.active')).map(o => o.dataset.value).join('.');
        this.updateSelectedValues();
    }
    updateSelectedValues(){
        this.dropdowns.forEach((dropdown) =>{
            const options = dropdown._menu.querySelectorAll('.js-variant-selector-option');
            dropdown._element.querySelector('slot[name="selectedValue"]').textContent = Array.from(options).find(o => o.classList.contains('active')).textContent;
        });
        console.log(this.querySelector('input[name="variantId"]'));
        this.querySelector('input[name="variantId"]').value = this.variantCombination;
    }
}

customElements.define( 'variant-selector', variantSelector );