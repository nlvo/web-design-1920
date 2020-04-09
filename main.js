const section = document.querySelectorAll('section').parentNode;
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const checkbox = document.querySelector('input[type="checkbox"]')
let y = 0;

document.addEventListener('keydown', function(event){
    if(event.key == 'ArrowDown') {
        checkboxes.forEach(element => {
            if(element.checked) {
                console.log('oooh')
                const nextElement = element.parentElement.nextElementSibling;
                const parentDiv = element.parentElement.parentNode;

                parentDiv.insertBefore(nextElement, element.parentElement)

                // console.log(element.parentElement.previousElementSibling);
                // console.log(element.parentElement.nextElementSibling);
            }
        });
    }
    else if(event.key == 'ArrowUp') {
        checkboxes.forEach(element => {
            if(element.checked) {
                console.log(event)
                const prevElement = element.parentElement.previousElementSibling;
                const parentDiv = element.parentElement.parentNode;

                parentDiv.insertBefore(element.parentElement, prevElement)

                // console.log(element.parentElement.previousElementSibling);
                // console.log(element.parentElement.nextElementSibling);
            }
        });
    }
    else if(event.key == 'ArrowLeft') {
        checkboxes.forEach(element => {
            if(document.activeElement == element) {
                console.log(element);
                element.checked = true;
                // https://stackoverflow.com/questions/36430561/how-can-i-check-if-my-element-id-has-focus
            }
        });
    }
    else if(event.key == 'ArrowRight') {
        checkboxes.forEach(element => {
            if(element.checked) {
                element.checked = false;
            }
        });
    }
    // if(event.code == 'Space') {
    //     document.focus()
    // }
});

// https://htmldom.dev/drag-and-drop-element-in-a-list
// https://css-tricks.com/snippets/javascript/javascript-keycodes/
// https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore


// https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/accessibility-handbook/aria-checkbox/