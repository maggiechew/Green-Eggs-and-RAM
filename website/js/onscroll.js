document.addEventListener("DOMContentLoaded", function (event) {
    document.addEventListener("scroll", function (event) {
        const animatedBoxes = document.getElementsByClassName("animated-box-left");
        const windowOffsetTop = window.innerHeight + window.scrollY;

        Array.prototype.forEach.call(animatedBoxes, (animatedBox) => {
            const animatedBoxOffsetTop = animatedBox.offsetTop;

            if (windowOffsetTop >= animatedBoxOffsetTop) {
                addClass(animatedBox, "move-in-left");
            }
        });
    });
});

function addClass(element, className) {
    const arrayClasses = element.className.split(" ");
    if (arrayClasses.indexOf(className) === -1) {
        element.className += " " + className;
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.addEventListener("scroll", function (event) {
        const animatedBoxr = document.getElementsByClassName("animated-box-right");
        const windowOffsetTop = window.innerHeight + window.scrollY;

        Array.prototype.forEach.call(animatedBoxr, (animatedBoxr) => {
            const animatedBoxrOffsetTop = animatedBoxr.offsetTop;

            if (windowOffsetTop >= animatedBoxrOffsetTop) {
                addClass(animatedBoxr, "move-in-right");
            }
        });
    });
});

function addClass(element, className) {
    const arrayClasses = element.className.split(" ");
    if (arrayClasses.indexOf(className) === -1) {
        element.className += " " + className;
    }
}