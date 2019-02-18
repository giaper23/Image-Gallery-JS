/*----------------------------------- IMAGE GALLERY --------------------------------------*/
alert("Click on the big image to STOP autoplay. \nDouble click it to START again. \nControl the interval with SLIDER! \nYou can also click the THUMBNAILS to choose an image! ");

const current = document.querySelector('#current'); // The current image shown
const thumbnails = Array.from(document.querySelectorAll('.thumbnails img')); // All the small thumbnails
const opacity = 0.3; // Opacity value

let i = 0; // Counts the items in thumbnails
let j = 0; // Needed to count the first time a loop runs

let thumbnailAudio = new Audio('Sound/click.mp3'); // Sound effect for clicking thumbnails

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");

/*------------------------------------ FADE IN FUNCTION ---------------------------------------*/

function fadeIn() {

    current.classList.add('fade_in'); // Adds class "fade_in" which contains animation to current 
    setTimeout(() => current.classList.remove('fade_in'), 500); // Removes class after 500ms because it stays on the current img and doesn't add class again if we don't remove it

}

/*---------------------------------- STOP AUTOPLAY FUNCTION ------------------------------------*/

function stopPlay() {

    clearInterval(interval); // Stops the autoplay

}

/*----------------------------------- CLICK FUNCTION -----------------------------------------*/

function thumbnailClick(e) {

    thumbnails.forEach(img => (img.style.opacity = 1)); // Resets opacity on each click
    
    current.src = e.target.src; // Changes the src of img named "current" to the src of the img being clicked
    
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
        current.src = thumbnails[i].src;
        fadeIn();
        i = 1; // If I don't make i =1 I will see first pic 2 times
    }

    else if ( i === 0 && j === 0) {
        current.src = thumbnails[i].src;
        i++; // After this runs add +1 to i
        j++; // After this one time it will never run again because only the first time it runs both i and j are 0

    }

    else {
        
        current.src = thumbnails[i].src;
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

current.onclick = stopPlay; // On click stop autoplay
current.ondblclick = carousel; //On double click start the autoplay

/*-------------------------- SLIDER ----------------------------*/

output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {

  output.innerHTML = this.value;
  carousel();
  
} 