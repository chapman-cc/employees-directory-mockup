// * --------------------------------
// * VARIABLES
// * --------------------------------
const directory = document.getElementById('directory');
const modal = document.getElementById('modal');
const searchBar = document.getElementById('searchBar');
const randomUserAPI = "https://randomuser.me/api/?results=12&nat=us,nz,au,ca";

let employeesDirectory = [];

// * --------------------------------
// * FUNCTIONS
// * --------------------------------
/**
 * getJSON function is to use Promise to request a XMLHttpRequest and return the parsed JSON data 
 * ! this function is not used, its only existance is to let me try out promise syntax
 * @param {string} method is "GET" or "POST"
 * @param {*} url is server url or API url
 */
const getJSON = (method, url) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onerror = function (error) {
            reject(error);
        }
        xhr.onload = function () {
            if (this.status === 200) {
                resolve (JSON.parse(this.response));
            } else {
                reject(this.statusText);
            }
        }
        xhr.send();
    })
}
/**
 * create an HTML card, for both Large and Medium size 
 * 
 * @param {object} emp pass in employee object to construct a HTML card 
 * @param {string} size between "large" or "medium (default)"
 */
const createCard = (emp, size = "medium") => {
    let tel = createHTMLNode(emp.cell, "p", "card__details");
    let location = emp.location.street + ", " + emp.location.city + ", " + emp.location.postcode;
    let address = createHTMLNode(location, "p", "card__details");
    let dob = emp.dob.date.slice(0, 10);
    let Bday = createHTMLNode(dob, 'p', "card__details");
    let line = createHTMLNode(null, 'div', "card__line");

    let email = createHTMLNode(emp.email, "p", "card__details", "card__email");
    let city = createHTMLNode(emp.location.city, 'p', "card__details");
    let name = createHTMLNode(emp.name.fullName, 'h2', "card__name");

    let cardProfile = createHTMLNode(null, "div", "card__profile");

    switch (size) {
        case "large": appendMultipleChild(cardProfile, name, email, city, line, tel, address, Bday); break;
        case "medium": appendMultipleChild(cardProfile, name, email, city); break;
    }

    let img = createHTMLNode(null, 'img', "card__avatar");
    img.src = emp.picture[size];
    img.alt = emp.name.fullName;

    let card = createHTMLNode(null, 'div', "card");
    appendMultipleChild(card, img, cardProfile);
    return card;
}

/**
 * 
 * @param {array} employees is array pass from AJAX
 */
const createEmployeeCardSet = (employees, size = "medium") => {
    let cards = [];
    employees.forEach(employee => {
        let card = createCard(employee, size) ;
        cards.push(card)
    });
    return cards
};

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

/**
 * add an ascending index value to the HTML collection
 * 
 * @param {DOM} datas is the HTML collection
 * @param {string} name is the key inside the dataset
 */
const add2Dataset = (datas, name) => {
    for (let key in datas) datas[key].dataset[name] = key;
    return datas;
}
// * --------------------------------
// * MAIN CODE
// * --------------------------------

fetch(randomUserAPI)
    .then(response => response.json())                      // parse JSON
    .then(datas => datas.results)                           // extract results from Object //todo add full name and dob to the datas 
    .then(datas => {                                        // this add a getter method for fullname later use 
        for (let data of datas) {
            Object.defineProperty(data.name, "fullName", {
                get() {
                    return `${this.first} ${this.last}`
                }
            })
        }
        return datas;
    })
    .then(data => employeesDirectory = data)                // store info into const employeesDirectory
    .then(employees => createEmployeeCardSet(employees))    // create HTML collection of cards
    .then(cards => add2Dataset(cards, "in"))                // add an obj.dataset.in = 0 value 
    .then(cards => appendMultipleChild(directory, ...cards))
    .catch(err => console.log("There is an error in the code: " + err));
