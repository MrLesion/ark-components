const constants ={
    'ESCAPE_KEY': 'Escape'
}

class modalButton extends HTMLElement {
    constructor() {
        super();
        this.updatePropsByAttributes();
        
    }
    connectedCallback(){
        this.addEventListener('click', this);
    }
    
    updatePropsByAttributes(){
        this.getAttributeNames().forEach((attributeName) =>{
            this[attributeName] = this.getAttribute(attributeName);
        });
    }
    handleEvent(event){
        switch ( event.type ) {
            case 'click':
                this.handleClick(event);
        }
    }
    handleClick(){
        const modalDialog = document.querySelector(`modal-dialog[id="${this.target}"]`);
        if(modalDialog !== null){
            modalDialog.show = true;
        }
        
    }
}

class modalDialog extends HTMLElement {

    static get observedAttributes() {
        return ['show'];
    }

    get show() {
        return this.getAttribute('show');
    }
    set show(val) {
        this.setAttribute('show', val);
    }
    
    static get getStyle(){
        const style = document.createElement("style");
        style.textContent = `
            modal-dialog{
                display:none;
                opacity: 0;
                position: fixed;
                z-index: 1099;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,.5);
                transition: all ease .3s;
            }
            modal-dialog[show="true"]{
                display: block;
            }
            modal-dialog .modal-inner{
                position:relative;
                margin:10% auto;
                max-width: 720px;
                background-color: rgba(255,255,255, 1);
            }
            modal-dialog .close-modal{
                position:absolute;
                top: -6px;
                right: -12px;
                font-size: 2em;
                line-height:0;
                cursor:pointer;
                padding: 3px;
            }
        `;
        return style;
        
    }

    constructor() {
        super();
        this.updatePropsByAttributes();
        const style = modalDialog.getStyle;
        this.appendChild(style);
        const template = this.querySelector('template');
        this.template = template.cloneNode(true);
        this.appendChild(this.template.content);
    }
a
    connectedCallback(){
        this.addEventListener('click', this);
    }

    attributeChangedCallback(name, value, update){
        if(value === null || value === update){
            return;
        }
        
        switch ( name ){
            case 'show':
                this.toggleModal();
                break;
        }
    }
    
    updatePropsByAttributes(){
        this.getAttributeNames().forEach((attributeName) =>{
            this[attributeName] = this.getAttribute(attributeName);
        });
    }

    handleEvent(event){
        switch ( event.type ) {
            case 'click':
                this.handleClick(event);
                break;
            case 'keydown':
                this.handleKeydown(event);
                break;
        }
    }

    handleClick(event){
        if(event.target === this || event.target.getAttribute('close') !== null){
            event.preventDefault();
            this.show = false;
        }
    }

    handleKeydown(event){
        if(event.code === constants.ESCAPE_KEY){
            this.show = false;
        }
    }
    
    toggleModal(){
        const isShow = this.show === 'true';
        
        setTimeout(() =>{
            this.style.opacity = isShow ? '1' : '';
        }, 50);
        
        if(isShow){
            document.addEventListener('keydown', this, false);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener( 'keydown', this, false );
            document.body.style.overflow = '';
        }
    }
}

customElements.define( 'modal-button', modalButton );
customElements.define( 'modal-dialog', modalDialog );