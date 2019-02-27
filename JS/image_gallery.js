/*----------------------------------- IMAGE GALLERY --------------------------------------*/

alert("Click on the big image to STOP autoplay. \nDouble click it to START again. \nControl how fast images change with the SLIDER! \nYou can also click on the THUMBNAILS to choose an image! ");

const currentImg = document.querySelector('#currentImg'); // The current image shown
const arrow_left = document.querySelector('#arrow_left'); // The left arrow
const arrow_right = document.querySelector('#arrow_right'); // The right arrow
const thumbnails = Array.from(document.querySelectorAll('.thumbnails img')); // All the small thumbnails
const opacity = 0.3; // Opacity value

let i = 0; // Counts the items in thumbnails
let j = 0; // Needed to count the first time a loop runs

let thumbnailAudio = new Audio('Sound/click.mp3'); // Sound effect for clicking thumbnails
let arrowAudio = new Audio('Sound/slide.mp3'); // Sound effect for clicking the arrows

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");

/*------------------------------------ FADE IN FUNCTION ---------------------------------------*/

function fadeIn() {

    currentImg.classList.add('fade_in'); // Adds class "fade_in" which contains animation to currentImg 
    setTimeout(() => currentImg.classList.remove('fade_in'), 500); // Removes class after 500ms because it stays on the current img and doesn't add class again if we don't remove it

}

/*---------------------------------- STOP AUTOPLAY FUNCTION ------------------------------------*/

function stopPlay() {

    clearInterval(interval); // Stops the autoplay

}

/*----------------------------------- THUMBNAIL CLICK FUNCTION -----------------------------------------*/

function thumbnailClick(e) {

    thumbnails.forEach(img => (img.style.opacity = 1)); // Resets opacity on each click
    
    currentImg.src = e.target.src; // Changes the src of img named "currentImg" to the src of the img being clicked
    
    fadeIn();
    
    e.target.style.opacity = opacity; // Changes opacity of target img

    stopPlay();

    i = thumbnails.indexOf(e.target) + 1;

    thumbnailAudio.pause(); // Sound effect lasts some time so if we press the button faster it will be stopped, then played

    thumbnailAudio.currentTime = 0; // Time of play is now reset

    thumbnailAudio.play(); // Everytime we click a thumbnail this sound plays

}

/* For each img in the div with class name "thumbnails", listen for click then call function thumbnailCLick */
thumbnails.forEach(img => img.addEventListener('click', thumbnailClick));

/*--------------------------------------- AUTOPLAY FUNCTION -----------------------------------*/

function autoPlay() { 

    if ( i === thumbnails.length ) {
        
        i = 0; // Resets i when at the end of thumbnails items
        currentImg.src = thumbnails[i].src;
        fadeIn();
        i = 1; // If I don't make i =1 I will see first pic 2 times
    }

    else if ( i === 0 && j === 0) {

        currentImg.src = thumbnails[i].src;
        i++; // After this runs add +1 to i
        j++; // After this one time it will never run again because only the first time it runs both i and j are 0

    }


    else {
        
        currentImg.src = thumbnails[i].src;
        fadeIn();
        i++; // Adds 1 to i
    
        }

}

/*-------------------------------------- CAROUSEL FUNCTION---------------------------------------*/

let interval = setInterval(autoPlay, slider.value * 1000); // Call autoPlay every X ms

function carousel() {

clearInterval(interval); // Stops the autoplay <---- Very important, without it I could only stop and start one time!
interval = setInterval(autoPlay, slider.value * 1000); // Call autoPlay every X ms
thumbnails.forEach(img => (img.style.opacity = 1)); // Resets opacity on each click

}

/*-------------------------- Starting / Stopping Autoplay -----------------------*/

currentImg.onclick = stopPlay; // On click stop autoplay
currentImg.ondblclick = carousel; //On double click start the autoplay

/*-------------------------- SLIDER ----------------------------*/

output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {

  output.innerHTML = this.value;
  carousel();

} 

/*------------------------------ ARROW CLICK FUNCTIONS ---------------------------*/

// Big trouble when I tried to do this. Things I did above made this a lot more complicated than it should

function arrowRightClick() { 

    arrowAudio.pause(); 

    arrowAudio.currentTime = 0; 

    arrowAudio.play(); 

    stopPlay();

    thumbnails.forEach(img => (img.style.opacity = 1));

    if ( i === thumbnails.length ) {
        
        i = 0; // Resets i when at the end of thumbnails items
        currentImg.src = thumbnails[i].src;
        fadeIn();

    }

    else if ( i === 0 ) {

        i++; // After this runs add +1 to i
        currentImg.src = thumbnails[i++].src;
        fadeIn();

    }


    else {
        
        currentImg.src = thumbnails[i].src;
        fadeIn();
        i++; // Adds 1 to i
    
        }

}

function arrowLeftClick() {

    arrowAudio.pause(); 

    arrowAudio.currentTime = 0; 

    arrowAudio.play(); 

    stopPlay();

    thumbnails.forEach(img => (img.style.opacity = 1));

    if ( i === 0 ) {

        i = thumbnails.length - 1;
        currentImg.src = thumbnails[i].src;
        fadeIn();
        i++;
    }

    else if ( i === 1) {

        i = thumbnails.length - 1;
        currentImg.src = thumbnails[i].src;
        fadeIn();
        i++;

    }

    else {
        
    currentImg.src = thumbnails[i-2].src;
    i--;
    fadeIn();

    }
    
}

arrow_right.onclick = arrowRightClick;
arrow_left.onclick = arrowLeftClick;