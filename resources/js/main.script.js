'use strict'

const _InlineElementsClasses = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "button", "span"];
const _LoadingTime = 3000;


/* ---------------------------------------------------------------------------------------- */

function uniqueId(length = 32, checkNode = false) {
    let idString;

    length = length < 0 ? 32 : length;

    const createId = function() {
        let idString = "";
        do {
            let ascicode = Math.floor((Math.random() * 42) + 48);
            if (ascicode < 58 || ascicode > 64) {
                let randomChar = String.fromCharCode(ascicode);
                randomChar = Math.random() < 0.5 ? randomChar.toLowerCase() : randomChar;
                idString += randomChar;
            }
        } while (idString.length + 1 <= length);
        return idString;
    }

    let att = 1,
        maxAtt = 100;
    do {
        idString = createId();
        att++;
    }
    while (document.getElementById(idString) && checkNode && att <= maxAtt)

    return (idString);
}


// document.body.addEventListener("DOMNodeInserted", (e) => {
//     console.log(e.path[0]);
// });

document.getElementById("button_1").addEventListener("click", e => {
    const createdElement = document.createElement("p");
    createdElement.innerHTML = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis tempora ad suscipit quibusdam minima quo.";
    createdElement.classList.add("gfh");
    Helper.addClass(createdElement, "lol kek 4ebyrek");
    document.getElementById("wrapper").append(createdElement);
});

document.getElementById("button_3").addEventListener("click", e => {

});

/* ---------------------------------------------------------------------------------------- */

function createElement(type = "div", classes = false, id = false) {
    var newElement = document.createElement(type);
    if (id) newElement.id = id;
    if (classes) {
        const classesArray = classes.split(" ");
        classesArray.forEach(function(value, key) {
            newElement.classList.add(value);
        });
    }
    return newElement;
}

function resizeWindow() {
    const body = document.body;
    const header = document.getElementById("header") || document.getElementsByTagName("header");
    const main = document.getElementById("main") || document.getElementsByTagName("main");
    const footer = document.getElementById("footer") || document.getElementsByTagName("footer");

    const bodyHeight = body ? header.offsetHeight : 0;
    const headerHeight = header ? header.offsetHeight : 0;
    const mainHeight = main ? main.offsetHeight : 0;
    const footerHeight = footer ? footer.offsetHeight : 0;

    const newMainHeight = bodyHeight - (headerHeight + footerHeight);
    if (main) main.style.height = newMainHeight + "px";
}

window.addEventListener("resize", e => {
    console.log("resize");
    resizeWindow();
});

window.addEventListener("load", e => {
    resizeWindow();
});

/* ---------------------------------------------------------------------------------------- */

const originCodeString = `
let arraySize = 100;
let min = 100, max = 1000;
let arr = new Array();
for (let i = 0; i < arraySize; i++) {
    let randNum = Math.floor(Math.random( ) * (max - min + 1)) + min;
    arr.push(randNum);
}
console.log(arr);
`.trim();

const codeBoxContainer = document.getElementById("code_1");
const codeByArray = originCodeString.split("\n");

const numberElements = codeByArray.length;

const lineNumbersContainer = createElement("div", "codebox__line-numbers");
const mainCodeContainer = createElement("code", "codebox__main-code");

const buttonsContainer = createElement("div", "codebox__buttons-cont");
const runCodeButton = createElement("button", "codebox__button");
const copyCodeButton = createElement("button", "codebox__button");

codeBoxContainer.innerHTML = "";
codeBoxContainer.append(buttonsContainer);
codeBoxContainer.append(lineNumbersContainer);
codeBoxContainer.append(mainCodeContainer);

buttonsContainer.append(runCodeButton);
buttonsContainer.append(copyCodeButton);

runCodeButton.innerText = "Run";
copyCodeButton.innerText = "Copy";

runCodeButton.addEventListener("click", e => {
    e.preventDefault();
    eval(originCodeString);
});

copyCodeButton.addEventListener("click", e => {
    e.preventDefault();

    let newinput = document.createElement("input");
    newinput.value = originCodeString;
    codeBoxContainer.append(newinput);

    newinput.select();
    document.execCommand("copy");
    newinput.parentNode.removeChild(newinput);
});

codeByArray.forEach(function(value, key) {

    const lineNumbersElement = createElement("span", "codebox__line-numbers-elem");
    const mainCodeElement = createElement("span", "codebox__main-code-elem");

    lineNumbersContainer.append(lineNumbersElement);
    mainCodeContainer.append(mainCodeElement);

    lineNumbersElement.innerHTML = key;
    mainCodeElement.innerHTML = value;

});

/* ---------------------------------------------------------------------------------------- */
document.querySelectorAll
const boxBody3 = document.getElementById("boxBody_3");
const stringWithDropElements = "Lorem ipsum dolor sit amet, [DROP] adipisicing elit. Corporis veritatis libero, magnam fugit corrupti velit neque [DROP] aperiam dolores? Recusandae qui omnis quidem velit iste!";

const searchElement = "[DROP]";
const replaceElement = `<span class="drop-container"></span>`;

const stringWithDropElementsArray = stringWithDropElements.split(" ");

stringWithDropElementsArray.forEach(function(value, key) {
    if (value.toLocaleLowerCase() == searchElement.toLocaleLowerCase()) {
        stringWithDropElementsArray[key] = replaceElement;
    } else {
        stringWithDropElementsArray[key] = "<p>" + value + "</p>";
    }
});

const resultString = stringWithDropElementsArray.join(" ");

boxBody3.innerHTML = resultString;

/* ---------------------------------------------------------------------------------------- */

document.addEventListener("contextmenu", e => { e.preventDefault(); });
document.addEventListener("mousedown", e => { e.preventDefault(); });

const moveObjects = document.querySelectorAll(`[data-move="true"]`);

if (moveObjects) {

    let mouseEvent = null;
    let mouseDown = true;

    moveObjects.forEach(function(elem, key) {

        var elemPosition = elem.getBoundingClientRect();

        elem.style.width = elem.offsetWidth + "px";
        elem.style.height = elem.offsetHeight + "px";

        elem.style.left = elemPosition.left + "px";
        elem.style.top = elemPosition.top + "px";

        elem.style.position = "fixed";

        elem.addEventListener("mousedown", e => {
            e.preventDefault();
            mouseDown = true;

            elemPosition = elem.getBoundingClientRect();

            const pos = {
                left: e.clientX - elemPosition.left,
                top: e.clientY - elemPosition.top
            };

            let changePosition = () => {
                const topValue = mouseEvent.clientY - pos.top;
                const leftValue = mouseEvent.clientX - pos.left;
                elem.style.top = topValue + "px";
                elem.style.left = leftValue + "px";

                mouseDown && setTimeout(changePosition, 10);
            };

            changePosition();
        });
    });

    document.body.addEventListener("mousemove", e => mouseEvent = e);
    document.body.addEventListener("mouseup", e => mouseDown = false);
}