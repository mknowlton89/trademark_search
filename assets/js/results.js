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
var documentLocation = document.location.search;
var searchPram = //documentLocation.split("?")[1];
//clear issue with search space
searchPram = searchPram.replace(/%20/g, " ");
//getting elements
var TMIdeaTakenEL = $("#ideaTaken");
var TMTakeninfoEL  = $("#takeninfo");
var DMGetDomainsEL = $('#getDomain');
var DMwhoIsinfoEL  = $('#whoIsinfo');

//var fetchButton = document.getElementById('fetch-button');
//api Key's
var uspToKey = "a28485e035mshea53364c530bf58p1f6a19jsn9a5ad2a4ac17";
var domainKey = "at_20p8HWePpxdOdgfSS2c42tVKGNMRB";

//By defualt hide all element and it will enabled based on condition);
$('#ideaTaken').hide();
$('#takeninfo').hide();
$('#getDomain').hide();
$('#whoIsinfo').hide();
console.log(searchPram);
//$("searchInput").val =searchPram;

 
/**Decalared Function
 * Last Modified: 03/12/2021 Egon
 * add gettrademMarkAp function and return if searched name is been already registered or not.
 */
 function gettrademMarkApi() {
   // fetch request gettrademMarkApi
  // console.log(requestUrl);
   fetch("https://uspto-trademark.p.rapidapi.com/v1/trademarkAvailable/" +  searchPram +"", {
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
     .then(function (data)
    {
      if (data[0].available === "yes")
       {
          isDomainAvailable() 
       }
       else
       {
             $('#ideaTaken').show();
             $("#ul-idea-taken").append($("<li>").text("Trademark for " +  searchPram  + " availability is "  + data[0].available));
            // $('#takeninfo').show();
            // $("#ul-taken-info").append($("<li>").text("Trademark taken by  Eloy Gonzalez"));
       }

       console.log(data)
       domainNotAvailable();
     });
 }
 

 function isDomainAvailable() {
  var requestUrl = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey='+ domainKey  + '&domainName=' +  searchPram + '.com&credits=DA';
  fetch(requestUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
       if (data.DomainInfo.domainAvailability === "AVAILABLE") {
          $('#getDomain').show();
          $('#whoIsinfo').hide();
         $("#ul-get-domnain").append($("<li>").text("Domanin is available. " + data.DomainInfo.domainName));
           console.log( data.DomainInfo.domainName);
                  // isDomainAvailable();
      }
      else
      {

        domainNotAvailable();
      }

      });
}

function domainNotAvailable() {
  var requestUrl = 'https://api.hunter.io/v2/domain-search?domain=' + searchPram +'.com&api_key=26a2165679ec1861826dfff2c09beacaca1785a2';

  fetch(requestUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {

           console.log( data.data);
           $('#getDomain').hide();
           $('#whoIsinfo').show();
           $("#ul-who-Is-info").append($("<li>").text("Qrganization: " + data.data.organization));
           $("#ul-who-Is-info").append($("<li>").text("Located: " + data.data.country));
           $("#ul-who-Is-info").append($("<li>").text("Domain: " + data.data.domain));
         // isDomainAvailable();
        /// https://help.opendatasoft.com/apis/ods-search-v1/#security

      });
}

//call function

 gettrademMarkApi();
 
