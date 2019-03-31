directory.addEventListener('click', evt => {
    let target = evt.target;
    while (target.className !== "card") {
        target = target.parentNode;
    }
    modalCard.innerHTML = target.innerHTML;
    modal.classList.toggle('card--hidden')

}, false)

modal.addEventListener('click', evt => {
    if (evt.target === modalCard || evt.target === modal) {
        modalCard.innerHTML = null;
        toggleMultiClasses("card--hidden", modal);
    }
})

function toggleMultiClasses(className, ...elements) {
    elements.forEach(element => {
        element.classList.toggle(className)
    })
}