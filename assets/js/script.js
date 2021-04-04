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
let searchQuery = $('#searchInput');



// JS Variables
const redirectUrl = "./results.html?";
let searchHistory;


// Function Definitions
function redirectUser(event) {
  event.preventDefault();

  // Pull local storage use JSON.parse
  searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

  console.log(searchHistory);

  // If it's undefined, set up empty array
  if (searchHistory === null) {
    searchHistory = [];
  }

  console.log(searchHistory);

  // Push into it
  searchHistory.push(searchQuery.val());

  console.log(searchHistory);

  // Set it to local storage (via stringify)
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  document.location.assign(redirectUrl + searchQuery.val());

}

function redirectUserMobile(event) {

  event.preventDefault();

  searchQuery = $('#mobileSearchInput');
  // searchQuery = searchQuery.val();

  // Pull local storage use JSON.parse
  searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

  console.log(searchHistory);

  // If it's undefined, set up empty array
  if (searchHistory === null) {
    searchHistory = [];
  }

  console.log(searchHistory);

  // Push into it
  searchHistory.push(searchQuery.val());

  console.log(searchHistory);

  // Set it to local storage (via stringify)
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  document.location.assign(redirectUrl + searchQuery.val());

}

// Event Listeners
$('#submitBtn').on("click", redirectUser);
$('#mobileSubmitBtn').on("click", redirectUserMobile);

// Function Calls