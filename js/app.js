window.addEventListener("DOMContentLoaded", () => {

    const directory = document.getElementById('directory');
    const modal = document.getElementById('modal');
    const modalShadow = document.getElementById('modalShadow');
    const randomUserAPI = "https://randomuser.me/api/?results=12&nat=us,nz,au,ca";

    getJSON('GET', randomUserAPI, "results")
        .then(createEmployeeCard)
        .then(appendToDirectory)
        .catch(err => console.log(err));
})

/**
 * getJSON function is to use Promise to request a XMLHttpRequest and return the parsed JSON data 
 * 
 * @param {string} method is "GET" or "POST"
 * @param {*} url is server url or API url
 * @param {*} key is object key to extract data from response 
 */
const getJSON = (method, url, key) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onerror = function (error) {
            reject(error);
        }
        xhr.onload = function () {
            if (this.status === 200) {
                let data = JSON.parse(this.response);
                resolve(data[key]);
            } else {
                reject(this.statusText);
            }
        }
        xhr.send();
    })
}

/**
 * 
 * @param {array} employees is array pass from AJAX
 */
const createEmployeeCard = employees => {
    let cards = [];
    employees.forEach(employee => {

        let employeeTel = createHTMLNode(employee.cell, "p", "card__employeeDetails");

        let location = employee.location.street + ", " + employee.location.city + ", " + employee.location.postcode;
        let employeeLocation = createHTMLNode(location, "p", "card__employeeDetails");
        let dob = employee.dob.date.slice(0, 10);
        let employeeBday = createHTMLNode(dob, 'p', "card__employeeDetails");
        let cardSeperator = createHTMLNode(null, 'div', "card__seperator");

        let fullName = employee.name.first + " " + employee.name.last;
        let employeeEmail = createHTMLNode(employee.email, "p", "card__employeeDetails", "card__employeeEmail");
        let employeeCity = createHTMLNode(employee.location.city, 'p', "card__employeeDetails");
        let employeeName = createHTMLNode(fullName, 'h2', "card__employeeName");

        let cardProfile = createHTMLNode(null, "div", "card__profile");

        appendMultipleChild(cardProfile, employeeName, employeeEmail, employeeCity, cardSeperator, employeeTel, employeeLocation, employeeBday);

        let img = createHTMLNode(null, 'img', "card__avatar");
        img.src = employee.picture.large;
        img.alt = fullName;

        let card = createHTMLNode(null, 'div', "card");
        appendMultipleChild(card, img, cardProfile);
        cards.push(card)
    });
    return cards
};
/**
 * appendToDirectory is a function to append a set of array to the directory 
 * @param {array} cards is an array of Nodes collection to append to directory
 */
const appendToDirectory = cards => {
    cards.forEach(card =>
        directory.appendChild(card)
    )
}
/**
 * Create a HTML DOM Node 
 * 
 * @param {*} innerText texts set inside the HTML node
 * @param {string} element tag set inside the HTML node
 * @param  {...string} classNames a set of classes, can be multiple 
 */
const createHTMLNode = (innerText, element, ...classNames) => {
    let node = document.createElement(element);
    classNames.forEach(className => node.classList.add(className))
    node.innerText = innerText;
    return node;
}
/**
 * To append multiple children to a parent DOM node, in order from top to bottom
 * 
 * @param {DOM} parent is the parent element to append from
 * @param  {...DOM} children are childs that append to children 
 */
const appendMultipleChild = (parent, ...children) => {
    children.forEach(child => parent.appendChild(child))
};