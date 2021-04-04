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

var documentLocation = document.location.search;
var searchPram = documentLocation.split("?")[1];
let formattedSearchPram = searchPram.replace(/%20/g, "");
searchPram = searchPram.replace(/%20/g, " ");
//getting elements
var TMIdeaTakenEL = $("#ideaTaken");
var TMTakeninfoEL = $("#takeninfo");
var DMGetDomainsEL = $('#getDomain');
var DMwhoIsinfoEL = $('#whoIsinfo');
//var DMBBtnEL = $('#start-trademark');
var DMBBtnEL = document.getElementById("start-trademark");

//var fetchButton = document.getElementById('fetch-button');
//api Key's
var uspToKey = "a28485e035mshea53364c530bf58p1f6a19jsn9a5ad2a4ac17";
var domainKey = "at_LE1xLfVxdyH9NpCndBKcxKTwMP85e";
var domainNotAvailable = "at_LE1xLfVxdyH9NpCndBKcxKTwMP85e";

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

  searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

  console.log(searchHistory);
  console.log(searchHistory.length);

  // Create a div to hold the local storage
  const searchHistoryDiv = $("<div>");

  // Create a headline for the DIV
  const searchHistoryH3 = $('<h3>').text("Search History");

  // Create a paragraph to list the number of searches someone has done
  let numberOfSearches = $('<p>').text(searchHistory.length);

  // Create an un-ordered list for the search history
  const searchHistoryList = $('<ul>');
  searchHistoryList.attr("id", "searchHistory");

  // Append everything to the page
  $('#mySidenav').append(searchHistoryDiv);
  searchHistoryDiv.append(searchHistoryH3);
  searchHistoryDiv.append(numberOfSearches);
  searchHistoryDiv.append(searchHistoryList);

  // Create a for-loop to build out the full search history
  for (let i = 0; i < searchHistory.length; i++) {
    // Get the item in the array, create a list element, and then give it text.
    let searchHistoryListItem = $('<li>');
    let searchHistoryListLink = $('<a>').text(searchHistory[i]);

    searchHistoryListLink.attr("href", "./results.html?" + searchHistory[i]);

    // Append the list item to the list.
    searchHistoryList.append(searchHistoryListItem);
    searchHistoryListItem.append(searchHistoryListLink);
  }

  // fetch request gettrademMarkApi
  // console.log(requestUrl);
  fetch("https://uspto-trademark.p.rapidapi.com/v1/trademarkAvailable/" + searchPram + "", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "" + uspToKey + "",
      "x-rapidapi-host": "uspto-trademark.p.rapidapi.com"
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data[0].available === "yes") {
        $('#ideaTaken').show();
        $("#ul-idea-taken").append($("<li>").text("Success! The term \"" + searchPram + "\" hasn't been trademarked."));
        document.getElementById('start-trademark').style.visibility = 'show';
        isDomainAvailable()
      }
      else {
        $('#ideaTaken').show();
        $("#ul-idea-taken").append($("<li>").text("Sorry! The term \"" + searchPram + "\" has already been trademarked."));
        document.getElementById('start-trademark').style.visibility = 'hidden';
        isDomainAvailable()
        // $('#takeninfo').show();
        // $("#ul-taken-info").append($("<li>").text("Trademark taken by  Eloy Gonzalez"));
      }

    });
}

function isDomainAvailable(istrademark) {

  var requestUrl = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey=' + domainKey + '&domainName=' + formattedSearchPram + '.com&credits=DA';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.DomainInfo.domainAvailability === "AVAILABLE") {
        $('#getDomain').show();
        $('#whoIsinfo').hide();
        $("#ul-get-domnain").append($("<li>").text("Success! The domain " + data.DomainInfo.domainName + " is available"));
        document.getElementById('buy-domain').style.visibility = 'show';
        // isDomainAvailable();
      }
      else {
        $('#getDomain').show();
        $('#whoIsinfo').show();
        $("#ul-get-domnain").append($("<li>").text("Sorry! The domain " + data.DomainInfo.domainName + " is not available"));
        document.getElementById('buy-domain').style.visibility = 'hidden';
        DomainWhoIsinfo()
      }

    });
}

function DomainWhoIsinfo() {
  var requestUrl = 'https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=' + domainNotAvailable + '&domainName=' + searchPram + '.com&outputFormat=JSON';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      city: "Round Rock"
      country: "UNITED STATES"
      countryCode: "US"
      email: "ebedffafibhu@idp.email"
      fax: ""
      name: "Data protected, not disclosed"
      organization: "Dell Inc."
      postalCode: "78682"
      rawText: "Registrant Name: Data protected, not disclosed↵Registrant Organisation: Dell Inc.↵Registrant Street: 1 Dell Way↵Registrant Street: RR1-33↵Registrant City: Round Rock↵Registrant State/Province: Texas↵Registrant Postal Code: 78682↵Registrant Country: US↵Registrant Phone: Data protected, not disclosed↵Registrant Fax: Data protected, not disclosed↵Registrant Email: ebedffafibhu@idp.email"
      state: "Texas"
      street1: "1 Dell Way↵RR1-33"
      countryCode: "US"
      telephone: ""
      // console.log(data.WhoisRecord.registrant.organization);
      $('#getDomain').hide();
      $('#whoIsinfo').show();
      if (data.WhoisRecord.registrant.organization) {
        $("#ul-who-Is-info").append($("<li>").text("Company Name: " + data.WhoisRecord.registrant.organization));
      }
      else {
        $("#ul-who-Is-info").append($("<li>").text("Company Name: -missing-"));
      }

      if (data.WhoisRecord.registrant.rawText) {
        $("#ul-who-Is-info").append($("<li>").text("Description: " + data.WhoisRecord.registrant.rawText.replace(/&amp;/g, "&")));
      }
      else {
        $("#ul-who-Is-info").append($("<li>").text("Description: -missing-"));
      }

      if (data.WhoisRecord.registrant.telephone) {
        if (data.WhoisRecord.registrant.telephone) {
          $("#ul-who-Is-info").append($("<li>").text("Phone: " + data.WhoisRecord.registrant.telephone));
        }
        else {
          $("#ul-who-Is-info").append($("<li>").text("Phone: -missing-"));
        }
      }
      else {
        $("#ul-who-Is-info").append($("<li>").text("Phone: -missing-"));
      }
      if (data.WhoisRecord.registrant.street1) {
        if (data.WhoisRecord.registrant.street1) {
          $("#ul-who-Is-info").append($("<li>").text("Located: " + data.WhoisRecord.registrant.street1 +
            ", " + data.WhoisRecord.registrant.state + ", " + data.WhoisRecord.registrant.countryCode));
        }
        else {
          $("#ul-who-Is-info").append($("<li>").text("Located: -missing-"));
        }
      }
      else {
        $("#ul-who-Is-info").append($("<li>").text("Located: -missing-"));
      }
      if (data.WhoisRecord.registrant.email) {
        if (data.WhoisRecord.registrant.email) {
          $("#ul-who-Is-info").append($("<li>").text("Email: " + data.WhoisRecord.registrant.email));
        }
        else {
          $("#ul-who-Is-info").append($("<li>").text("Domain: -missing-"));
        }
      }
      else {
        $("#ul-who-Is-info").append($("<li>").text("Domain: -missing-"));
      }
    });
}


document.getElementById("start-trademark").addEventListener("click", function () {
  window.open('https://www.uspto.gov/trademarks/apply/initial-application-forms', '_blank');
});

document.getElementById("buy-domain").addEventListener("click", function () {
  window.open('  https://www.godaddy.com/', '_blank');

});

$('#searchBtn').on('click', function () {

  let queryInput = $('#queryInput');

  console.log(queryInput.val());

  redirectUrl = "./results.html" + "?" + queryInput.val();

  // Pull local storage use JSON.parse
  searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

  console.log(searchHistory);

  // If it's undefined, set up empty array
  if (searchHistory === null) {
    searchHistory = [];
  }

  console.log(searchHistory);

  // Push into it
  searchHistory.push(queryInput.val());

  console.log(searchHistory);

  // Set it to local storage (via stringify)
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  document.location.assign(redirectUrl);
})
//call function
gettrademMarkApi();


