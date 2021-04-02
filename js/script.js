/**
* Name: Eloy Gonzalez
* Date: 03/21/2021
* Description:
 The script.js will be getting the result for the input field for the initial search and pass the parameters to the result.html and result.js to consumes the parameter info. It also domain manipulates the DOM for index.html. 
   This app will run in the browser and 
  feature dynamically updated HTML jQuery and connect to Api's for trademark,domain. This amazing team effort. Go team!
*/

/**Decalared Variables
 * Last Modified: 03/12/2021 Egon
 * started script.js file
 */

// DOM Variables
const searchQuery = $('#searchInput');



// JS Variables
const redirectUrl = "./results.html?";


// Function Definitions
function redirectUser(event) {
  event.preventDefault();

  console.log(searchQuery.val());

  document.location.assign(redirectUrl + searchQuery.val());

}


// Event Listeners
$('#submitBtn').on("click", redirectUser);

// Function Calls