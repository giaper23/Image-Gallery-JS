/*----------------------------------- IMAGE GALLERY --------------------------------------*/

alert("Click stops autoplay. Double click starts the autoplay.");

const current = document.querySelector('#current'); // The current image shown
const thumbnails = document.querySelectorAll('.thumbnails img'); // All the small thumbnails
const opacity = 0.3; // Opacity value
let i = 0; // Counts the items in thumbnails
let j = 0; // Needed to count the first time a loop runs

/* For each img in the div with class name "thumbnails", listen for click then call function thumbnailCLick */
thumbnails.forEach(img => img.addEventListener('click', thumbnailClick));

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

    i = thumbnails.indexOf(); // Not working !! BUG

}

/*--------------------------------------- AUTOPLAY FUNCTION -----------------------------------*/

function autoPlay() { 

    if ( i === thumbnails.length - 1) {
         // The value of i will never be 10, but it will be 9 on the last image
        current.src = '/Images/photo' + i + '.jpeg'; // Changes src of current
        fadeIn();
        i = 0; // Resets i when at the end of thumbnails items

    }

    else if ( i === 0 && j === 0) {

        current.src = '/Images/photo' + i + '.jpeg'; // Changes src of current
        i++; // After this runs add +1 to i
        j++; // After this one time it will never run again because only the first time it runs both i and j are 0

    }

    else {
        
        current.src = '/Images/photo' + i + '.jpeg'; // Changes src of current
        fadeIn();
        i++; // Adds 1 to i
    
        }

}

/*-------------------------------------- CAROUSEL FUNCTION---------------------------------------*/

let interval = setInterval(autoPlay, 5000); // Call autoPlay every X ms

function carousel() {

clearInterval(interval); // Stops the autoplay <---- Very important, without it I could only stop and start one time!
interval = setInterval(autoPlay, 5000); // Call autoPlay every X ms
thumbnails.forEach(img => (img.style.opacity = 1)); // Resets opacity on each click

}

/*-------------------------- Starting / Stopping Autoplay -----------------------*/

current.onclick = stopPlay; // On click stop autoplay
current.ondblclick = carousel; //On double click start the autoplay
