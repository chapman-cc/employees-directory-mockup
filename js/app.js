$(document).ready(function () {

    const randomUserAPI = "https://randomuser.me/api/?results=12&nat=us,nz,au,ca "

    $.getJSON(randomUserAPI, data => {

        employees.forEach(employee => {
            // create employee name title
            let fullName = employee.name.first + " " + employee.name.last;
            let $employeeName = $("<h2></h2>").addClass('card__employeeName').text(fullName);

            // create employee email
            let $employeeEmail = $("<p></p>").addClass('card__employeeEmail').text(employee.email);

            // create employee location
            let $employeeCity = $("<p></p>").addClass('card__employeeLocation').text(employee.location.city);

            // create profile 
            let $cardProfile = $("<p></p>");
            $cardProfile.addClass('card__profile').append($employeeName).append($employeeEmail).append($employeeCity);
            
            // create img
            let $img = $("<img>").attr({
                src: employee.picture.medium,
                alt: fullName,
                class: "card__avatar" 
            })

            // create card
            let $card = $("<div></div>").addClass("card");
            $card.append($img).append($cardProfile);

            // append to directory
            $('.directory').append($card)
                
        })
    }) // end of .getJSON



}); // end of document ready 