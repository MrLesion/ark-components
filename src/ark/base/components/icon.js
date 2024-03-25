import { BaseArkElement } from '../index';
import { parseAttribute } from '../utillities';

class arkIcon extends BaseArkElement{

    get icon() {
        return parseAttribute(this.getAttribute('icon'));
    }

    get width() {
        return parseAttribute(this.getAttribute('width'));
    }

    get height() {
        return parseAttribute(this.getAttribute('height'));
    }
    
    constructor() {
        super();
        this.handler()
    }

    handler = () => {
        const icon = `./images/svg/${this.icon}.svg`;
        this.style.width = `${this.width ? this.width : 50}px`;
        this.style.height = `${this.height ? this.height : ''}px`;
        
        this.style.width
        fetch(icon)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(svgText => {
                this.innerHTML = svgText;
            })
            .catch(error => {
                console.error('There was a problem fetching the SVG:', error);
            });
        
        
    }
}

customElements.define( 'ark-icon', arkIcon );