import {BaseArkElement} from '../base'
import {parseAttribute} from '../base/utillities'
import {arkCarouselSlide} from './carousel-slide'

class arkCarousel extends BaseArkElement {
    static get observedAttributes() {
        return ['current-slide'];
    }

    get currentSlide() {
        return parseAttribute(this.getAttribute('current-slide'));
    }

    set currentSlide(value) {
        return this.setAttribute('current-slide', value);
    }
    
    constructor() {
        super();
        
        this.swipe = {
            start: 0,
            isSwiping: false
        }
        
        this.container = null;

        this.slides = Array.from(this.querySelectorAll('ark-carousel-slide'));
        this.navigationTypes = this.hasAttribute('navigation') ? this.getAttribute('navigation').trim().split(',') : [];
        
        this.buildContainer();

        if(this.slides.length > 1 && this.navigationTypes.length > 0){
            this.buildNavigation();
        }

        this.slides.forEach((slide, index) =>{
            slide.setAttribute('active', index === this.currentSlide);
        });
        
        window.addEventListener('resize', this, false)
        
    }

    connectedCallback(){
        this.addEventListener('click', this, false);
        this.addEventListener('touchstart', this, false);
        this.addEventListener('mousedown', this, false);
        this.addEventListener('touchend', this, false);
        this.addEventListener('mouseup', this, false);
    }

    disconnectedCallback(){
        this.removeEventListener('click', this, false);
        this.removeEventListener('touchstart', this, false);
        this.removeEventListener('mousedown', this, false);
        this.removeEventListener('touchend', this, false);
        this.removeEventListener('mouseup', this, false);
    }

    handleEvent(event){
        const currentSlide = this.currentSlide;
        if(event.type === 'click'){
            if(event.target.dataset.direction !== undefined){
                this.slides[this.currentSlide].setAttribute('active', false);
                this.setCurrentSlide(event.target.dataset.direction);
            }
            if(event.target.dataset.slideTo !== undefined){
                this.currentSlide = parseInt(event.target.dataset.slideTo);
                this.emitEvent(`ark.carousel.slide`, {
                    slideFrom: currentSlide,
                    slideTo: this.currentSlide
                });
            }
            if(event.target.matches('ark-carousel-slide')){
                const customEvent = new CustomEvent('ark.slide.click', {
                    bubbles: true
                });
                event.target.dispatchEvent(customEvent);
            }
        }
        if(event.type === 'touchstart' || event.type === 'mousedown'){
            this.swipeStart(event)
        }
        
        if(event.type === 'touchend' || event.type === 'mouseup'){
            this.swipeTo(event)
        }
        if(event.type === 'resize'){
            this.slideTo();
        }
    }

    emitEvent(eventType, details) {
        const customEvent = new CustomEvent(eventType, {
            bubbles: true,
            detail: details
        });
        this.dispatchEvent(customEvent);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === null || oldValue === newValue){
            return;
        }
        if(name === 'current-slide'){
            this.slideTo()
        }
    }
    
    swipeStart(event){
        if (this.swipe.isSwiping) return;
        if(event.type === 'touchstart'){
            this.swipe.start = event.touches[0].clientX;
        } else{
            this.swipe.start = event.clientX;
        }
        this.swipe.isSwiping = true;
    }

    swipeTo(event){
        const swipeEnd = (event.type === 'touchmove') ? event.touches[0].clientX : event.clientX
        const deltaX = swipeEnd - this.swipe.start;

        if (deltaX > 0) {
            this.setCurrentSlide('prev');
        } else if (deltaX < 0) {
            this.setCurrentSlide('next');
        }
        
        this.swipe.start = 0;
        this.swipe.isSwiping = false;
    }
    
    setCurrentSlide(direction){
        const currentSlide = this.currentSlide;
        if(direction === 'next'){
            if(this.currentSlide < this.slides.length - 1){
                this.currentSlide++;
            } else{
                this.currentSlide = 0;
            }
        }
        if(direction === 'prev'){
            if(this.currentSlide > 0){
                this.currentSlide--;
            } else{
                this.currentSlide = this.slides.length - 1;
            }
        }

        this.emitEvent(`ark.carousel.slide`, {
            slideFrom: currentSlide,
            slideTo: this.currentSlide
        });
    }
    
    slideTo(){
        const slideWidth =  this.slides[this.currentSlide].offsetWidth;
        const slideToPosition = -this.currentSlide * slideWidth;
        this.slides.forEach((slide, index) => {
            this.innerContainer.style.transform = `translateX(${slideToPosition}px)`;
            slide.setAttribute('active', index === this.currentSlide);
        });
        this.setNavigationActiveState();
    }

    buildContainer(){
        this.container = document.createElement('div');
        this.innerContainer = document.createElement('div');
        this.container.className = 'ark-carousel-container';
        this.innerContainer.className = 'ark-carousel-slides';
        const slides = this.querySelectorAll('ark-carousel-slide')

        for ( let i = 0; i < slides.length; i++ ) {
            this.innerContainer.appendChild(slides[i]);
        }
        this.container.appendChild(this.innerContainer)
        this.appendChild(this.container)
    }
    
    buildNavigation(){
        if(this.navigationTypes.includes('arrows')){
            this.buildNavigationArrows();
        }
        if(this.navigationTypes.includes('thumbs')){
            this.buildNavigationThumbs();
        }
        if(this.navigationTypes.includes('dots')){
            this.buildNavigationDots();
        }
    }
    
    buildNavigationArrows(){
        const prevButton = document.createElement('div');
        prevButton.className = 'ark-carousel-arrow prev';
        prevButton.dataset.direction = 'prev';
        const nextButton = document.createElement('div');
        nextButton.className = 'ark-carousel-arrow next';
        nextButton.dataset.direction = 'next';
        this.container.appendChild(prevButton);
        this.container.appendChild(nextButton);
    }
    
    buildNavigationDots(){
        const list = document.createElement('ul');
        list.className = 'ark-carousel-dots';
        for ( let i = 0; i < this.slides.length; i++ ) {
            const dot = document.createElement('li');
            dot.className = 'ark-carousel-dot';
            if(i === this.currentSlide){
                dot.classList.add('active')
            }
            dot.dataset.slideTo = i;
            list.appendChild(dot)
        }
        this.container.appendChild(list)
    }
    
    buildNavigationThumbs(){
        const list = document.createElement('ul');
        list.className = 'ark-carousel-thumbs';
        for ( let i = 0; i < this.slides.length; i++ ) {
            const thumb = document.createElement('li');
            thumb.className = 'ark-carousel-thumb';
            if(i === this.currentSlide){
                thumb.classList.add('active')
            }
            thumb.style.backgroundImage = `url(${this.slides[i].poster ? this.slides[i].poster : this.slides[i].src})`
            thumb.dataset.slideTo = i;
            list.appendChild(thumb)
        }
        this.appendChild(list);
    }
    
    setNavigationActiveState(){
        this.querySelectorAll('.ark-carousel-dot').forEach((element, index) =>{
            if(index === this.currentSlide){
                element.classList.add('active')
            } else{
                element.classList.remove('active')
            }
        });
        this.querySelectorAll('.ark-carousel-thumb').forEach((element, index) =>{
            if(index === this.currentSlide){
                element.classList.add('active')
            } else{
                element.classList.remove('active')
            }
        });
    }
}

if(!customElements.get('ark-carousel')) {
    customElements.define( 'ark-carousel', arkCarousel );
}