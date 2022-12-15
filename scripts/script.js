// JavaScript Document
console.log("hi");


// Audio

let linkComic = document.querySelector('main > section:nth-of-type(2) ul li:nth-of-type(3) a');
let linkComic2 = document.querySelector('main > section:nth-of-type(2) ul li:nth-of-type(2) a');
let linkComic3 = document.querySelector('main > section:nth-of-type(2) ul li:nth-of-type(6) a');
let soundEffect = document.querySelector('.soundeffect');



function playsoundeffect(){
    soundEffect.src = "./audio/glittersoundeffect.mp3";
    soundEffect.play();
    console.log("jkdwk");
}

function playsoundeffect2(){
	soundEffect.src = "./audio/romanticsoundeffect.mp3";
    soundEffect.play();
    console.log("jkdwk");
}

function playsoundeffect3(){
	soundEffect.src = "./audio/scarysoundeffect.mp3";
    soundEffect.play();
    console.log("jkdwk");
}

linkComic.addEventListener('click', playsoundeffect);
linkComic2.addEventListener('click', playsoundeffect2);
linkComic3.addEventListener('click', playsoundeffect3);




// Slider javascript van sanne

function createAutoscrollDragCarousel(deCarousel) {
	const scrollContainer = deCarousel.querySelector("main > section:nth-of-type(1) ul");
	const scrollElements = deCarousel.querySelectorAll("main > section:nth-of-type(1) ul li");
	const scrollCounter = deCarousel.querySelector("main > section:nth-of-type(1) > p em");


	const toTheLeft = "to the left";
	const toTheRight = "to the right";





	////////////////////////////////////////////////////
	// een timer om de elementen automatisch te scrollen
	////////////////////////////////////////////////////
	let scrollTimer;
	const scrollTime = 3000; // 3 seconds

	// start de timer
	function startScrollTimer() {
		scrollTimer = setInterval(() => {
			// als de timer afgaat
			// de elementen naar links scrollen
			scrollTheElements(toTheLeft);
		}, scrollTime);
	}

	// stop de timer
	function stopScrollTimer() {
		clearInterval(scrollTimer);
	}

	// scrollen starten als pagina getoond wordt
	startScrollTimer();





	////////////////////
	// scrollen met drag
	////////////////////
	let dragging = false;
	let dragStartX;
	let dragDeltaX;
	let dragThreshold = 100; // te draggen afstand in px om scroll te activeren

	// nodig voor het drag streepje
	scrollContainer.style.setProperty("--dragThreshold", dragThreshold);
	
	// event om pointerup event met code te kunnen activeren
	const pointerUp = new PointerEvent('pointerup');


	function startDragging(event) {
		dragging = true;

		// de container (ul) weet dat er gedragged wordt
		// nodig voor cursor en transitie van li's
		scrollContainer.classList.add("dragging");

		// de startpositie van de pointer vastleggen
		dragStartX = event.clientX;

		// auto scrollen stoppen als er gedragged wordt
		stopScrollTimer();
	};


	function handleDragging(event) {
		// de afstand bepalen die de pointer afgelegd heeft
		dragDeltaX = event.clientX - dragStartX;

		// die afstand vastleggen in een custom property
		// die custom property wordt gebruikt om de li's te bewegen
		scrollContainer.style.setProperty("--dragDeltaX", dragDeltaX);

		// als de afstand groter dan de threshold is (positief --> naar rechts)
		if (dragDeltaX > dragThreshold ) {
			// het draggen stoppen
			// door het pointerup event af te laten gaan
			scrollContainer.dispatchEvent(pointerUp);
			// de elementen naar rechts laten scrollen
			scrollTheElements(toTheRight);
		}
		// als de afstand groter dan de threshold is (negatief --> naar links)
		else if (dragDeltaX < dragThreshold * -1 ) {
			scrollContainer.dispatchEvent(pointerUp);
			scrollTheElements(toTheLeft);
		}
	}


	function stopDragging() {
		dragging = false;

		// de container (ul) weet dat er niet meer gedragged wordt
		scrollContainer.classList.remove("dragging");

		// de container vertellen dat de gescrollde afstand niet meer relevant is
		// de elementen scrollen naar de nieuwe positie
		// of terug naar hun oude positie
		scrollContainer.style.setProperty("--dragDeltaX", 0);

		// auto scrollen weer starten
		startScrollTimer();
	}


	// de pointer events

	// als de gebruiker op de muis klikt
	// of met vinger scherm aanraakt
	scrollContainer.addEventListener('pointerdown', (event) => {
		// console.log("down");
		startDragging (event);
	});

	// als de gebruiken de muis na klikken beweegt
	// of met vinger op scherm beweegt
	scrollContainer.addEventListener('pointermove', (event) => {
		// console.log("move");
		if (dragging) {
			handleDragging(event);
		}
	});

	// als gebruiker muis loslaat
	// of vinger van scherm haalt
	scrollContainer.addEventListener('pointerup', (event) => {
		// console.log("up");
		if(dragging) {
			stopDragging();
		}
	});

	// als gebruiker muis buiten section beweegt
	// of vinger buiten section beweegt
	scrollContainer.addEventListener('pointerleave', (event) => {
		// console.log("leave");
		scrollContainer.dispatchEvent(pointerUp);
	});

	// als gebruiker muis een tijdje niet beweegt
	// of vinger een tijdje niet beweegt
	scrollContainer.addEventListener('pointercancel', (event) => {
		// console.log("cancel");
		scrollContainer.dispatchEvent(pointerUp);
	});





	/////////////////////////////////////////////
	// de elementen naar links of rechts scrollen
	/////////////////////////////////////////////
	function scrollTheElements(direction) {
		if (direction == toTheLeft) {

			// the pos(itie) van elk element wordt 1 verlaagd
			scrollElements.forEach( scrollElement => {
				let newPos = parseInt(scrollElement.dataset.pos) - 1;
				if (newPos == -1) {
					// the pos(itie) van het element dat pos0 had,
					// wordt de laatste pos(itie)
					// de lengte van array - 1;
					newPos = scrollElements.length - 1;
				}
				scrollElement.dataset.pos = newPos;
			});
		}

		else if (direction == toTheRight) {

			// the pos(itie) van elk element wordt 1 verlaagd
			scrollElements.forEach( scrollElement => {
				let newPos = parseInt(scrollElement.dataset.pos) + 1;
				if (newPos == scrollElements.length) {
					// the pos(itie) van het laatste element wordt pos0
					newPos = 0;
				}
				scrollElement.dataset.pos = newPos;
			});
		}

		// the counter updaten
		updateCounter(direction);
	}





	/////////////////////
	// de counter updaten
	/////////////////////
	function updateCounter(direction) {
		let curPos = parseInt(scrollCounter.textContent);
		let newPos;

		if (direction == toTheLeft) {
			newPos = curPos + 1;
			if (newPos > scrollElements.length) {
				newPos = 1;
			} 
		} else {
			newPos = curPos - 1;
			if (newPos < 1) {
				newPos = scrollElements.length;
			} 
		}

		scrollCounter.textContent = newPos;
	}
}




const deCarousel = document.querySelector("main > section:nth-of-type(1)");
createAutoscrollDragCarousel(deCarousel);