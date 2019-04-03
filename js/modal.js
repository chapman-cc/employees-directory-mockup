directory.addEventListener('click', evt => {
    let card = evt.target.closest("div.card"); // select the nearest "div.card" element 
    let modalRight = modal.querySelector("img.modal__rightArrow");
    let cardIndex = parseInt(card.dataset.in);
    let modalHTML = createCard(employeesDirectory[cardIndex], "large");
    modalHTML.dataset.in = cardIndex;
    modal.insertBefore(modalHTML, modalRight)
    modal.classList.toggle('card--hidden')
    
}, false)

modal.addEventListener('click', evt => {
    if (evt.target === modal) {
        modal.removeChild(modal.children[1]);
        modal.classList.toggle("card--hidden")
    } else if (evt.target.tagName === "IMG") {
        
        let card = modal.querySelector("div.card");
        let cardIndex = parseInt(card.dataset.in);
        
        let bool = parseInt(evt.target.dataset.bool);
        let cardNewIndex = bool? cardIndex + 1 : cardIndex -1; 
        
        let modalHTML = createCard(employeesDirectory[cardNewIndex], "large");
        modalHTML.dataset.in = cardNewIndex;
        modal.replaceChild(modalHTML, card)
    }
})

function toggleMultiClasses(className, ...elements) {
    elements.forEach(element => {
        element.classList.toggle(className)
    })
}