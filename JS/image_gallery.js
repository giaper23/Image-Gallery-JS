/*------------------------------------------------------------------------------------*/

const current = document.querySelector('#current'); // The current image shown
const thumbnails = document.querySelectorAll('.thumbnails img'); // All the small thumbnails
const opacity = 0.3;

/* For each img in the div with class name "thumbnails", listen for click then call function thumbnailCLick */
thumbnails.forEach(img => img.addEventListener('click', thumbnailClick));

function thumbnailClick(e) {
    
    thumbnails.forEach(img => (img.style.opacity = 1)); // Resets opacity on each click
    
    current.src = e.target.src; // Changes the src of img named "current" to the src of the img being clicked
    
    current.classList.add('fade_in'); // Adds class "fade_in" which contains animation to current 

    setTimeout(() => current.classList.remove('fade_in'), 500); // Removes class after 500ms because it stays on the current img and doesn't add class again if we don't remove it
    
    e.target.style.opacity = opacity; // Changes opacity of target img
}

let interval = setInterval(autoPlay, 2000); // Call autoPlay every 2000ms
let i = 0; // We must track the value of i

function autoPlay() { 

        if ( i === thumbnails.length - 1) { // The value of i will never be 10, but it will be 9 on the last image
            current.src = '/Images/photo' + i + '.jpeg'; // Changes src of current
            i = 0; // Resets i
        }

        else {current.src = '/Images/photo' + i + '.jpeg'; // Changes src of current
            i++; // Adds 1 to i 
            }

}
