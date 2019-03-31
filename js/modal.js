directory.addEventListener('click', evt => {
    let target = evt.target;
    while (target.className !== "card") {
        target = target.parentNode;
    }
    modalCard.innerHTML = target.innerHTML;
    toggleMultiClasses("card--hidden", modalCard, modalShadow);


}, false)

modal.addEventListener('click', evt => {
    if (evt.target === modalCard || evt.target === modalShadow) {
        modalCard.innerHTML = null;
        toggleMultiClasses("card--hidden", modalCard, modalShadow);
    }
})

function toggleMultiClasses(className, ...elements) {
    elements.forEach(element => {
        element.classList.toggle(className)
    })
}

