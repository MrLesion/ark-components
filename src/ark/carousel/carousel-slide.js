import {BaseArkElement} from '../base'
import {parseAttribute} from '../base/utillities'

export class arkCarouselSlide extends BaseArkElement{
    static get observedAttributes() {
        return ['active'];
    }

    get src() {
        return parseAttribute(this.getAttribute('src'));
    }
    
    get type() {
        return parseAttribute(this.getAttribute('type'));
    }

    get active() {
        return parseAttribute(this.getAttribute('active'))
    }

    get poster(){
        return parseAttribute(this.getAttribute('poster'));
    }

    get autoplay(){
        return parseAttribute(this.getAttribute('autoplay'))
    }

    constructor() {
        super();
        this.buildSlide();
        this.addEventListener('ark.slide.click', this, false);
    }

    connectedCallback(){}

    disconnectedCallback(){}

    handleEvent(event){
        if(event.type === 'ark.slide.click'){
            if(this.type === 'video'){
                this.toggleVideo();
            }
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === null || oldValue === newValue){
            return;
        }
        if(name === 'active' && this.type === 'video'){
            if(newValue === 'true'){
                if(this.autoplay) {
                    this.playVideo();
                }
            } else{
                this.pauseVideo();
            }
        }
    }
    
    buildSlide(){
        switch ( this.type ){
            case 'image':
                this.buildImageSlide();
                break;
            case 'video':
                this.buildVideoSlide();
                break;
            case 'iframe':
                this.buildIframeSlide();
                break;
            default:
                console.warn(`Type ${this.type} not supported`);
                break;
        }
    }
    buildImageSlide(){
        const tag = document.createElement('img');
        tag.src = this.src;
        this.appendChild(tag);
    }
    buildVideoSlide(){
        const tag = document.createElement('video');
        tag.src = this.src;
        if(this.autoplay){
            tag.muted = true;
            tag.playsinline = true;
        } else{
            tag.controls = true;
        }
        if(this.poster){
            tag.poster = this.poster;
        }
        tag.setAttribute('preload', 'auto');
        
        this.appendChild(tag);
    }

    playVideo(){
        this.querySelector('video').play();
    }
    
    pauseVideo(){
        this.querySelector('video').pause();
    }

    toggleVideo(){
        if(this.querySelector('video').paused){
            this.playVideo();
        } else{
            this.pauseVideo();
        }
    }

    buildIframeSlide(){
        const tag = document.createElement('iframe');
        tag.src = this.src;
        tag.setAttribute('allowfullscreen', true)
        this.appendChild(tag);
    }
}

if(!customElements.get('ark-carousel-slide')) {
    customElements.define( 'ark-carousel-slide', arkCarouselSlide );
}
