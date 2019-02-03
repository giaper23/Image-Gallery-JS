/*------------------------------------------------------------------------------------*/

const current = document.querySelector('#current'); // The current image shown
const thumbnails = document.querySelectorAll('.thumbnails img'); // All the small thumbnails
const opacity = 0.3;

thumbnails[0].style.opacity = opacity; // Thumbnail of first image displayed by default has opacity

/* For each img in the div with class name "thumbnails", listen for click then call function thumbnailCLick */
thumbnails.forEach(img => img.addEventListener('click', thumbnailClick));

function thumbnailClick(e) {
    
    thumbnails.forEach(img => (img.style.opacity = 1)); // Resets opacity on each click
    
    current.src = e.target.src; // Changes the src of img named "current" to the src of the img being clicked
    
    current.classList.add('fade_in'); // Adds class "fade_in" which contains animation to current 

    setTimeout(() => current.classList.remove('fade_in'), 500); // Removes class after 500ms because it stays on the current img and doesn't add class again if we don't remove it
    
    e.target.style.opacity = opacity; // Changes opacity of target img
}

let interval = setInterval(loop, 3000);

function loop() {
    for ( let i = 0; i < thumbnails.length; i++) {
        
        if ( i === thumbnails.length ) {
            current.src = '/Images/photo' + i + '.jpeg';
            i = 0;
        }
        else {current.src = '/Images/photo' + i + '.jpeg';  
            }      
    }
}
