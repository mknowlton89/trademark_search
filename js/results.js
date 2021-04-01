/**
* Name: Eloy Gonzalez
* Date: 03/21/2021
* Description:
 This week’s homework requires us to create a result the js to be able to to connect to Api's for trademark,domain validation and manuplate the DOM of the result html. 
   This app will run in the browser and 
  feature dynamically updated HTML jQuery and connect to Api's for trademark,domain. This amazing team effort. Go team!
*/

/**Decalared Variables
 * Last Modified: 03/12/2021 Egon
 * add variables for traversing the DOM and api credentials for trademark
 */
var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
// var searchTM = "starbucks";
var uspToKey = "a28485e035mshea53364c530bf58p1f6a19jsn9a5ad2a4ac17";
var url_string = window.location.href; //result.html
var url = new URL(url_string);
var searchPram = url.searchParams.get("search");
$("searchInput").val =searchPram;

 
/**Decalared Function
 * Last Modified: 03/12/2021 Egon
 * add gettrademMarkAp function and return if searched name is been already registered or not.
 */
 function gettrademMarkApi() {
   // fetch request gettrademMarkApi
  // console.log(requestUrl);
   fetch("https://uspto-trademark.p.rapidapi.com/v1/trademarkAvailable/" + searchEL +"", {
     "method": "GET",
     "headers": {
       "x-rapidapi-key": ""+ uspToKey + "",
       "x-rapidapi-host": "uspto-trademark.p.rapidapi.com"
     }
   })
     .then(function (response) {
       console.log('fetches from ', response);
       return response.json();
     })
     .then(function (data) {
       
       console.log(data)
 
     });
 }
 
 
 gettrademMarkApi();
 
