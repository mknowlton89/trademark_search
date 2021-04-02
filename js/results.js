/**
* Name: Eloy Gonzalez
* Date: 03/21/2021
* Description:
 This week’s homework requires us to create a result the js to be able to to connect to Api's for trademark,domain validation and manuplate the DOM of the result html. 
   This app will run in the browser and 
  feature dynamically updated HTML jQuery and connect to Api's for trademark,domain. This amazing team effort. Go team!
*/

/**Decalared Variables
 * Last Modified: 04/01/2021 Egon
 * add variables for traversing the DOM and api credentials for trademark
 */
alert("test");
var documentLocation = document.location.search;
var searchPram =  documentLocation.split("?")[1];
//getting elements
var TMIdeaTakenEL = $("#ideaTaken");
var TMTakeninfoEL  = $("#takeninfo");
var DMGetDomainsEL = $('#getDomain');
var DMwhoIsinfoEL  = $('#whoIsinfo');

//var fetchButton = document.getElementById('fetch-button');
//api Key's
var uspToKey = "a28485e035mshea53364c530bf58p1f6a19jsn9a5ad2a4ac17";
var domainKey = "at_LBBpNCI2SIGGWhUHrEjGJvHQIK7q6";
var domainNotAvailable = "at_LBBpNCI2SIGGWhUHrEjGJvHQIK7q6";

//By defualt hide all element and it will enabled based on condition);
$('#ideaTaken').hide();
$('#takeninfo').hide();
$('#getDomain').hide();
$('#whoIsinfo').hide();

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
       return response.json();
     })
     .then(function (data)
    {
      if (data[0].available === "yes")
       {
          $('#ideaTaken').show();
          $("#ul-idea-taken").append($("<li>").text("Success! The term \"" +  searchPram  + "\" hasn't been trademarked."));
          isDomainAvailable() 
       }
       else
       {
             $('#ideaTaken').show();
             $("#ul-idea-taken").append($("<li>").text("Sorry! The term \"" +  searchPram  + "\" has already been trademarked."));
             isDomainAvailable() 
            // $('#takeninfo').show();
            // $("#ul-taken-info").append($("<li>").text("Trademark taken by  Eloy Gonzalez"));
       }

     });
 }
 
 function isDomainAvailable(istrademark) {
  var requestUrl = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey='+ domainKey  + '&domainName=' +  searchPram + '.com&credits=DA';
  fetch(requestUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
        console.log( data);
       if (data.DomainInfo.domainAvailability === "AVAILABLE") {
          $('#getDomain').show();
          $('#whoIsinfo').hide();
          $("#ul-get-domnain").append($("<li>").text("Success! The domain " + data.DomainInfo.domainName + " is available"));
          console.log( data);
                           // isDomainAvailable();
      }
      else
      {
        $('#getDomain').show();
        $('#whoIsinfo').show();
        $("#ul-get-domnain").append($("<li>").text("Sorry! The domain " + data.DomainInfo.domainName + " is not available"));
        DomainWhoIsinfo()
      }

      });
} 

function DomainWhoIsinfo() {
  var requestUrl = 'https://website-contacts.whoisxmlapi.com/api/v1?apiKey=' + domainNotAvailable + '&domainName=' +  searchPram + '.com';
  fetch(requestUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {

        console.log( data);
        $('#getDomain').hide();
        $('#whoIsinfo').show();
        $("#ul-who-Is-info").append($("<li>").text("Company Name: " + data.companyNames[0]));
        $("#ul-who-Is-info").append($("<li>").text("Title: " +  data.meta.title.replace(/&amp;/g, "&")));
        $("#ul-who-Is-info").append($("<li>").text("Description: " +  data.meta.description.replace(/&amp;/g, "&")));
        $("#ul-who-Is-info").append($("<li>").text("Phone: " + data.companyNames[0]));
        $("#ul-who-Is-info").append($("<li>").text("Located: " + data.postalAddresses[0]));
        $("#ul-who-Is-info").append($("<li>").text("Domain: " + data.domainName));
      });
} 

//call function
 gettrademMarkApi();
 
