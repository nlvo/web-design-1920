const section = document.querySelector('section').children;
const focusableEls = document.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
const firstFocusableEl = focusableEls[0];
const lastFocusableEl = focusableEls[focusableEls.length - 1];
const liveList = document.getElementsByTagName('input');
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const checkboxi = document.querySelectorAll('label')
const checkbox = document.querySelector('input[type="checkbox"]')

firstFocusableEl.focus();

checkboxes.forEach(element => {
    // todo:cleanup
    element.addEventListener('click', function() {
        checkboxes.forEach(a => {
            if(a.checked){
                console.log('fdd');
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

document.addEventListener('keydown', function(event){
    if(event.key == 'ArrowDown') {
        checkboxes.forEach(element => {
            if(element.checked) {
                console.log('oooh')

                const nextElement = element.parentElement.nextElementSibling;
                const parentDiv = element.parentElement.parentNode;

                parentDiv.insertBefore(nextElement, element.parentElement)

            }
        });
    }
    else if(event.key == 'ArrowUp') {
        checkboxes.forEach(element => {
            if(element.checked) {
                element.focus()
                const prevElement = element.parentElement.previousElementSibling;
                const parentDiv = element.parentElement.parentNode;
                console.log(event)
                if(prevElement) {
                    parentDiv.insertBefore(element.parentElement, prevElement)
                }
            }
        });
    }
    else if(event.key == 'ArrowLeft') {
        checkboxes.forEach(element => {

            if(document.activeElement == element) {
                if (element.checked) {
                    element.parentElement.classList.remove('active');
                    element.checked = false;
                } else {
                    element.parentElement.classList.add('active');
                    element.checked = true;
                    console.log('left!');
                    
                }
                // https://stackoverflow.com/questions/36430561/how-can-i-check-if-my-element-id-has-focus
            }
        });
    }
    else if(event.key == 'ArrowRight') {
        checkboxes.forEach(element => {
            if(document.activeElement == element) {
                if (element.checked) {
                    element.parentElement.classList.remove('active');
                    element.checked = false;
                } else {
                    element.parentElement.classList.add('active');
                    element.checked = true;
                }
                // https://stackoverflow.com/questions/36430561/how-can-i-check-if-my-element-id-has-focus
            }
        });
    }

    if(event.code === 'Space') {
        console.log(event.code);
        
        if (document.activeElement === document.body) {
            firstFocusableEl.focus();
            event.preventDefault();
        } 
        else {
            document.activeElement.parentElement.nextElementSibling.focus();
            checkboxes.forEach(element => {
                element.parentElement.classList.remove('active');
                element.checked = false
            });
        }
    } 
});

// https://htmldom.dev/drag-and-drop-element-in-a-list
// https://css-tricks.com/snippets/javascript/javascript-keycodes/
// https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
// https://stackoverflow.com/questions/28163033/when-is-nodelist-live-and-when-is-it-static
// https://stackoverflow.com/questions/56102665/is-it-possible-to-update-refresh-nodelist
// https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
// https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/accessibility-handbook/aria-checkbox/

   // else if (document.activeElement){
        //     console.log(Array.from(section).indexOf(document.activeElement));


        //     liveList[i].parentElement.nextElementSibling.focus();
        // }