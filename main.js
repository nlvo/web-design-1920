const body = document.querySelector('body');
const section = document.querySelector('section').children;
const focusableEls = document.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
const firstFocusableEl = focusableEls[0];
const lastFocusableEl = focusableEls[focusableEls.length - 1];
const liveList = document.getElementsByTagName('input');
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const songs = document.querySelectorAll('audio')
const checkbox = document.querySelector('input[type="checkbox"]')
const audio = document.querySelector('audio')
const playBtn = document.querySelector('.play')
const playBtnImage = document.querySelector('.play img')
const div = document.querySelector('.playlist')

focusableEls[1].focus();

function playPlaylist() {
    const img = audio.parentElement.querySelector('img');
    if (audio.paused) {
        playBtnImage.src = 'assets/img/pause.svg'
        img.src = 'assets/img/sound.svg'
        audio.play();
    } else {
        playBtnImage.src = 'assets/img/play.svg'
        img.src = 'assets/img/playcard.svg'
        audio.pause();
    }
}

playBtn.addEventListener('click', playPlaylist);

checkboxes.forEach(element => {
    // todo:cleanup
    element.addEventListener('click', function () {
        checkboxes.forEach(a => {
            if (a.checked) {
                a.checked = false
                a.parentElement.classList.remove('active');
            }
        });

        if (element.checked) {
            element.parentElement.classList.remove('active');
            element.checked = false
        } else {
            element.parentElement.classList.add('active');
            element.checked = true;

        }
    })
});

document.addEventListener('keydown', function (event) {
    // move item down
    if (event.key == 'y') {
        toggleCheckbox();
    } else if (event.key == 'y') {
        toggleCheckbox();
    } else if (event.key === 'j') {
        focusNextElement();
    } else if (event.key === 'k') {
        focusPreviousElement();
    } else if (event.key === 'p') {
        playSong();
    } else if (event.key === 'p') {
        playPlaylist();
    } else if (event.key === 'g') {
        placeCard();
    }
});

function moveDown(){
    // find checked checkbox
    checkboxes.forEach(element => {
        if (element.checked) {
            element.focus()
            const nextElement = element.parentElement.nextElementSibling;
            const parentDiv = element.parentElement.parentNode;

            parentDiv.insertBefore(nextElement, element.parentElement)
        }
    });
}

function moveUp(){
    // find checked checkbox
    checkboxes.forEach(element => {
        if (element.checked) {
            const prevElement = element.parentElement.previousElementSibling;
            const parentDiv = element.parentElement.parentNode;
            
            if (prevElement) {
                parentDiv.insertBefore(element.parentElement, prevElement)
                element.focus()
            }
        }
    });
}

function playSong() {
    checkboxes.forEach(element => {
        if (document.activeElement == element || element.checked) {
            
            const label = element.parentElement;
            const img = element.parentElement.querySelector('img');
            const audio = element.parentElement.getElementsByTagName('audio')[0];

            if (!audio.paused) {
                label.classList.remove('playing')
                playBtnImage.src = 'assets/img/play.svg'
                img.src = 'assets/img/playcard.svg'
                audio.pause();
                body.classList.remove('mood');
            } else {
                songs.forEach(song => {
                    if(!song.paused) {
                        song.pause();
                        song.parentElement.classList.remove('playing')
                    }
                })
                
                label.classList.add('playing')
                playBtnImage.src = 'assets/img/pause.svg'
                img.src = 'assets/img/sound.svg'
                audio.play();
                body.classList.add('mood');
            }
        }
    });
}

function pauseSong(){
    songs.forEach(song => {
        if(!song.paused) {
            song.pause();
            song.parentElement.classList.remove('playing')
        }
    })
}

function toggleCheckbox() {
    // select checkbox
    console.log('selected');
    
    checkboxes.forEach(element => {
        // check if anything is focused
        if (document.activeElement == element) {            
            if (element.checked) {
                element.parentElement.classList.remove('active');
                div.classList.remove('active');
                element.checked = false;
            } else {
                element.parentElement.classList.add('active');
                div.classList.add('active');
                element.checked = true;
                console.log('checked!');
            }
            // https://stackoverflow.com/questions/36430561/how-can-i-check-if-my-element-id-has-focus
        } 
        else {   
            // check if anything is already selected 
            if(element.parentElement.classList.contains('active')){
                console.log('duh',element.classList);
                element.parentElement.classList.remove('active');
                element.checked = false;
            }
        }
    });
}

function focusPreviousElement() {
    if (document.activeElement === document.body) {
        // firstFocusableEl.focus();
        event.preventDefault();
    } else {
        for (let i = 0; i < focusableEls.length; i++) {
            const currentFocus = focusableEls[i];
            if (currentFocus == document.activeElement) {                
                if (i > 0) {
                    i--
                    focusableEls[i].focus();
                }
            }
        }
        checkboxes.forEach(element => {
            element.parentElement.classList.remove('active');
            element.checked = false
        });
    }
}

function focusNextElement() {
    if (document.activeElement === document.body) {
        firstFocusableEl.focus();
        event.preventDefault();
    } else {
        for (let i = 0; i < focusableEls.length; i++) {
            const currentFocus = focusableEls[i];
            if (currentFocus == document.activeElement) {
                
                if (i < focusableEls.length - 1) {
                    i++
                    focusableEls[i].focus();
                } else {
                    firstFocusableEl.focus()
                }
            }
        }
        // checkboxes.forEach(element => {
        //     element.parentElement.classList.remove('active');
        //     element.checked = false
        // });
    }
}

function placeCard(){
    for (let i = 0; i < focusableEls.length; i++) {
        const currentFocus = focusableEls[i];
        if (currentFocus == document.activeElement) {

            checkboxes.forEach(element => {
                if (element.checked) {
                    const nextElement = currentFocus.parentElement.nextElementSibling;
                    const parentDiv = element.parentElement.parentNode;
                    parentDiv.insertBefore(element.parentElement, nextElement)
                    element.parentElement.focus()
                    console.log(element.parentElement.classList);   
                }
                div.classList.remove('active')
                element.parentElement.classList.remove('active')
            }); 
        }
    }
}

// https://htmldom.dev/drag-and-drop-element-in-a-list
// https://css-tricks.com/snippets/javascript/javascript-keycodes/
// https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
// https://stackoverflow.com/questions/28163033/when-is-nodelist-live-and-when-is-it-static
// https://stackoverflow.com/questions/56102665/is-it-possible-to-update-refresh-nodelist
// https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
// https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/accessibility-handbook/aria-checkbox/
