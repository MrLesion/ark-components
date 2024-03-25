class defaultComponent extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor() {
        super();
    }
    
    connectedCallback(){
        this.addEventListener('click', this, false);
    }

    disconnectedCallback(){
        this.removeEventListener('click', this, false);
    }
    
    handleEvent(event){
        alert(`fired: ${event.type}`)
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === null || oldValue === newValue){
            return;
        }
    }
}
customElements.define( 'default-component', defaultComponent );