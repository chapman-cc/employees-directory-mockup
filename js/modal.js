directory.addEventListener('click', evt => {
    let target = evt.target;
    while (target.className !== "card") {
        target = target.parentNode;
    }
    modal.innerHTML = target.innerHTML;
    toggleMultiClasses("card--hidden", modal, modalShadow);


}, false)

document.addEventListener('click', evt => {
    if (evt.target.id === "modal" || evt.target.id === "modalShadow") {
        modal.innerHTML = null;
        toggleMultiClasses("card--hidden", modal, modalShadow);
    }
})

function toggleMultiClasses(className, ...elements) {
    elements.forEach(element => {
        element.classList.toggle(className)
    })
}