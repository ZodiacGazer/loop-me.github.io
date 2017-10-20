'use strict';
(function(){
	const PICS_LENGHT  = 59; // OPTIONAL
	const DROPS_LENGHT = 3;
	const IMAGE_PATH   = 'images/phone/' // PHONES
	const PHONE        = 'phone_';

	// DOM

	const frame          = document.querySelector('.frame');
	const sliderTool     = document.querySelector('.slider__tool');
	const flash          = document.querySelector('.flash');
	const phone          = document.querySelector('.phone');
	const card 		     = document.querySelector('.card');
	const cardEffect     = document.querySelector('.card__effect');
	const phoneHighlight = document.querySelector('.highlight');
	const text1 	     = document.querySelector('.txt-1');
	const text2 	     = document.querySelector('.txt-2');
	const text3 	     = document.querySelector('.txt-3');
	const text4 	     = document.querySelector('.txt-4');
	const text           = document.getElementsByClassName('text');
	
	function openCanvas(imagePackage) {
		const imagePackage = imagePackage;
		phone.classList.add('phone-onfade');
		CanvasArea.start();
		
		CanvasArea.eventHandler(imagePackage);
		CanvasArea.onFadingEvent();
	}

	function textChecker(textArr){
		const textBlock = textArr;
		textBlock.style.opacity = 1;
		let i;
		for (i = 0; i < text.length; i++) {
			if ( text[i] != textBlock) {
				text[i].style.opacity = 0;
			}
		}

	}

	const CanvasArea = {
		canvas: document.getElementById('canvas'),
		start() {
			this.canvas.width = 520;
			this.canvas.height = 230;
			this.context = this.canvas.getContext('2d');
			console.log('Canvas Created')
		},
		getImgArray(picsLenght, path, item) {
			const PICS_LENGHT = picsLenght;
			const PATH = path;
			let imagePackage = [];
			let x;
			for(x = 0; x <= PICS_LENGHT; x++) {
				let img = new Image();
				img.src = PATH + item + x +'.png';
				imagePackage.push(img);
				console.log(imagePackage[x] + ' - loaded')
			}
			return imagePackage;
		},
		eventHandler(imgPackage){
			const ctx = CanvasArea.context;
			imgPackage[0].onload = () => {
				ctx.drawImage(imgPackage[0], 0, 0);
			}
			text[0].style.opacity = 1;
			sliderTool.addEventListener('input', () => {
				CanvasArea.clear();
				if (sliderTool.value > 0) {
					frame.style.opacity = 0;
					phoneHighlight.style.display = "none";

					if(sliderTool.value == 29) {
						flash.style.animationName = flash.style.animationName ? '' : 'flash-click';
					} 
					if (sliderTool.value == PICS_LENGHT) {
						card.style.display = "block";
						cardEffect.style.display = "block";
						setTimeout(function(){
							cardEffect.classList.add('card__animated');
						}, 500);
						setTimeout(function(){
							cardEffect.classList.remove('card__animated');
						}, 1000);
						
					} else {
						card.style.display = "none";
						cardEffect.style.display = "none";
					}
				} else {
					frame.style.opacity = 1;
					phoneHighlight.style.display = "block";
				}


				ctx.drawImage(imgPackage[sliderTool.value], 0, 0);
			})
		},
		onFadingEvent(){
			let steps = (step) => {
				
				return Math.ceil(PICS_LENGHT / text.length) * step;
			}
			sliderTool.addEventListener('input', () =>{
				if (sliderTool.value <= steps(1)) {
					textChecker(text[0]); // First block
				}
				if (sliderTool.value > steps(1) && sliderTool.value <= steps(2)) {
					textChecker(text[1]); // Second Block, ets...
				}
				if (sliderTool.value > steps(2) && sliderTool.value <= steps(3)) {
					textChecker(text[2]);
				}
				if (sliderTool.value > steps(3) && sliderTool.value <= steps(4)) {
					textChecker(text[3]);
				}
			})
		},
		clear() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}

	}
	const picsPackage = CanvasArea.getImgArray(PICS_LENGHT, IMAGE_PATH, PHONE);
	window.onload = function () {

		openCanvas(picsPackage);
	};


})();