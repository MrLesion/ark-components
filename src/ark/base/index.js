class BaseArkElement extends HTMLElement{
    /***
     * Returns an array of attributes that the browser will observe.
     * @returns {*[]}
     */
    static get observedAttributes() {
        return [];
    }

    /***
     * It’s called when the component is first initialized. 
     * It must call super() and can set any defaults or perform other pre-rendering processes.
     */
    constructor() {
        super();
    }

    /***
     * This function is called when the Web Component is appended to a Document Object Model.
     * It should run any required rendering.
     */
    connectedCallback(){
        //this.addEventListener('click', this, false);
    }

    /***
     * It’s called when the Web Component is removed from a Document Object Model. 
     * This may be useful if you need to clean up, such as removing stored state or aborting Ajax requests.
     ***/
    disconnectedCallback(){
        //this.removeEventListener('click', this, false);
    }

    /***
     * This function is called when a Web Component is moved from one document to another. 
     * You may find a use for this, although I’ve struggled to think of any cases!
     ***/
    adoptedCallback(){}

    /***
     * Handles all events fired on 'this'
     * @param event
     */
    handleEvent(event){
        //console.log(`fired: ${event.type}`)
    }

    /***
     * Called whenever an observed attribute is changed. 
     * Those defined in HTML are passed immediately, but JavaScript can modify them:
     * @param name
     * @param oldValue
     * @param newValue
     ***/
    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === null || oldValue === newValue){
            return;
        }
    }
    
    /***
     * Dispatched a custom event on the component
     * @param event
     * @param details
     ***/
    emit(event, details){
        const customEvent = new CustomEvent(event, {
            bubbles: true,
            detail: details
        });
        this.dispatchEvent(customEvent);
    }
}

class BaseArkFormElement extends BaseArkElement{
    /***
     * Tells the component that this is a form element (input, select, textarea)
     * @type {boolean}
     */
    static formAssociated = true;

    /***
     * Set the form on the component
     * @param form
     */
    formAssociatedCallback(form) {
        this.form = form;
    }
}

export {BaseArkElement, BaseArkFormElement}