import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class pdfPreview extends HTMLElement{
    static get observedAttributes() {
        return ['render'];
    }
    
    constructor() {
        super();
        this.frame = null;
        const script = document.createElement('script');
        script.type = 'application/json';
        script.id = 'pdf-preview-model-script'
        this.appendChild(script)
        
    }

    connectedCallback(){}

    handleEvent(event){
        
    }

    attributeChangedCallback(name, value, update) {

        if(value === null || value === update){
            return;
        }

        switch ( name ){
            case 'render':
                if(parseInt(update) === 1){
                    this.renderPdf()
                }
                break;
        }
    }

    renderPdf(){
        try {
            const model = JSON.parse(this.querySelector('#pdf-preview-model-script').textContent);
            console.log(model);
            const pdfDocGenerator = pdfMake.createPdf(model);
            const hasFrame = this.frame !== null;
            pdfDocGenerator.getDataUrl((dataUrl) => {
                this.frame = hasFrame ? this.frame : document.createElement('iframe');
                this.frame.src = dataUrl;
                if(!hasFrame){
                    this.appendChild(this.frame);
                }
                this.setAttribute('render', '0')
            });
        }

        catch(ex) {
            console.error(ex);
        }
        
    }
}

customElements.define( 'pdf-preview', pdfPreview );