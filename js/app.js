

$(document).ready(function () {
    
    const randomUserAPI = "https://randomuser.me/api/?results=12&nat=us,nz,au,ca "
    
    $.getJSON(randomUserAPI, data => {
        const employees = data.results;
        // console.log (employees);
        employees.forEach(employee => {
            let $employeeTel = $("<p></p>").addClass("card__employeeDetails card--hidden").text(employee.cell);
            let location = employee.location.street + ", " + employee.location.city + ", " + employee.location.postcode;
            let $employeeLocation = $("<p></p>").addClass("card__employeeDetails card--hidden").text(location);
            
            let dob = employee.dob.date;
            let $employeeBday = $("<p></p>").addClass("card__employeeDetails card--hidden").text(dob.slice(0, dob.indexOf("T")));

            let $cardSeperator = $("<div></div>").addClass("card__seperator card--hidden");
            
            // create employee name title
            let fullName = employee.name.first + " " + employee.name.last;
            // let fullName = getFullSentense(employee.name, " ", "title")
            
            let $employeeName = $("<h2></h2>").addClass('card__employeeName').text(fullName);
            // create employee email
            let $employeeEmail = $("<p></p>").addClass('card__employeeEmail').text(employee.email);
            // create employee location
            let $employeeCity = $("<p></p>").addClass('card__employeeDetails').text(employee.location.city);
            // create profile 
            let $cardProfile = $("<div></div>");
            $cardProfile.addClass('card__profile').append($employeeName).append($employeeEmail).append($employeeCity);
            $cardProfile.append($cardSeperator).append($employeeTel).append($employeeLocation).append($employeeBday);        // toggle this
            // create img
            let $img = $("<img>").attr({
                src: employee.picture.medium,
                alt: fullName,
                class: "card__avatar"
            })
            // create card
            let $card = $("<a></a>").addClass("card");
            $card.append($img).append($cardProfile);
            // append to directory
            $('.directory').append($card)
        })
    }) // end of .getJSON
}); // end of document ready 

/** --------------------
 * FUNCTIONS 
-------------------- */

// function getFullSentense (obj, seperator, notThisKey) {
//     let sentense = "";
//     for (let key in obj) {
//         if (key !== notThisKey) {
//             sentense += obj[key] + seperator;
//         }
//     }
//     return sentense.slice(0, sentense.length - 1);
// }