//Fill out coin list array with all coin options on load
var coinlistFiltered = coinlist;

/*Tabelle mit Werten aus Datenbank füttern*/
function writeToTable() {
  var searchString = "VEE";
  var n = coinlist.findIndex(i => i.Symbol === searchString);
  console.log(n);
  console.log(coinlist[n]);
  //Write values into table
  var row = 1;
  var selectCoin = document.getElementsByClassName("filter_coins")[row];
  var ticker = document.getElementsByClassName("crypto_ticker")[row];
  var name = document.getElementsByClassName("crypto_name")[row];
  var quantity = document.getElementsByClassName("crypto_qty")[row];
  var investedSum = document.getElementsByClassName("crypto_invested_sum")[row];
  selectCoin.setAttribute("value", coinlist[n].FullName);
  ticker.setAttribute("value", coinlist[n].Symbol);
  name.setAttribute("value", coinlist[n].CoinName);
  quantity.setAttribute("value", 10);
  investedSum.setAttribute("value", 100);
}

function filterCoins(e) {
  //delete this arrow stuff, if you don't know how to use this to navigate in results.
  var event = window.event ? window.event : e;
  //console.log(event.keyCode)
  if (event.keyCode == '38') {
    console.log("Up arrow");
    return;
  }
  else if (event.keyCode == '40') {
    console.log("Down arrow");
    return;
  }
  //console.log(e.value);
  var input = e.value.toUpperCase();
  coinlistFiltered = coinlist.filter(function (coin) {
    if (coin.FullName.toUpperCase().indexOf(input) > -1) {
      return coin;
    }
  });
  //console.log(coinlistFiltered);
  createOptions(e);
  showDropdown(e); //show dropdown in case it has been hidden again by clicking on input field a second time
}

//Create options for dropdown menu. ATTENTION: Change this later to be created on page load, not onclick!
function createOptions(e) {
  var option = "";
  for (index in coinlistFiltered) {
    option += "<option onclick='writeToNameField(this)'>" + coinlistFiltered[index].FullName + "</option>";
  }
  e.parentElement.lastElementChild.lastElementChild.innerHTML = option;
}

function writeToNameField(e) {
  var selectedCoinIndex = e.parentElement.selectedIndex;
  var inputField = e.parentElement.parentElement.parentElement.firstElementChild;
  var cryptoTicker = e.parentElement.parentElement.parentElement.parentElement.children.item(3).firstElementChild;
  var cryptoName = e.parentElement.parentElement.parentElement.parentElement.children.item(4).firstElementChild;

  inputField.value = coinlistFiltered[selectedCoinIndex].FullName;
  cryptoTicker.value = coinlistFiltered[selectedCoinIndex].Symbol;
  cryptoName.value = coinlistFiltered[selectedCoinIndex].CoinName;
  toggleDropdownVisibility(e); //hide dropdown after selecting coin
  //console.log(inputField);
}

//Hide dropdown. Timeout needed. Else "writeToNameField()" not executed, when selecting token
function hideDropdown(e) {
  var dropdown = e.parentElement.lastElementChild;
  setTimeout(function () { dropdown.classList.remove("show"); }, 100)
}

function showDropdown(e) {
  var dropdown = e.parentElement.lastElementChild;
  dropdown.classList.add("show");
}

//When the user clicks on the text field, toggle between hiding and showing the dropdown content
function toggleDropdownVisibility(e) {
  var dropdown = e.parentElement.lastElementChild;
  dropdown.classList.toggle("show");
  //document.getElementById("myDropdown").classList.toggle("show");
}

/* New functions --------------------------------------------------------------------------------------*/
var locNumber = 0;
function filterCoins1(e) {

  //console.log(window.event);
  var event = window.event ? window.event : e;
  //console.log(event);
  var allToken = event.path[0].nextElementSibling.children;
  //console.log(allToken);
  //console.log(event.keyCode)
  if (event.keyCode == '38') {
    console.log("Up arrow");
    return;
  }
  else if (event.keyCode == '40') {
    console.log("Down arrow");

    allToken[locNumber].style.backgroundColor = "yellow";
    if (locNumber > 0) {
      allToken[locNumber - 1].style.backgroundColor = null;
    }
    locNumber++;
    console.log("locNumber",locNumber);
    return;
  }
  else if (event.keyCode == '13') {
    console.log("Enter");
    console.log(allToken[locNumber])
    return;
  }

  var input = e.value.toUpperCase();
  // console.log(input);
  coinlistFiltered = coinlist.filter(function (coin) {
    if (coin.FullName.toUpperCase().indexOf(input) > -1) {
      return coin;
    }
  });
  //console.log(coinlistFiltered);
  createOptions1(e);
}

//Create options for dropdown menu.
function createOptions1(e) {
  var option = "";

  for (index in coinlistFiltered) {
    option += "<a href='javascript:void(0)' onclick='writeToNameField1(this, " + index + ")'>" + coinlistFiltered[index].FullName + "</option>";
    //Limit amount of tokens shown to 6
    if (index >= 5) {
      break;
    }
  }

  var tokenContainer = e.parentElement.querySelector('.all-token');
  //console.log(tokenContainer);
  tokenContainer.innerHTML = option;
}

//When the user clicks on the text field, toggle between hiding and showing the dropdown content. Remove old text in input field
function showHideDropdown1(e) {
  e.parentElement.lastElementChild.classList.toggle("show");
  // var searchField = document.getElementById("my-input");
  var searchField = e.parentElement.lastElementChild.firstElementChild;
  //console.log(searchField);
  searchField.value = "";
  searchField.focus();
  searchField.scrollIntoView();
  coinlistFiltered = coinlist; //Reset coinlistFiltered
}

function writeToNameField1(e, index) {
  /*var fullName = coinlistFiltered[index].FullName;
  console.log(fullName);*/
  var inputField = e.parentElement.parentElement.parentElement.firstElementChild;
  var cryptoTicker = e.parentElement.parentElement.parentElement.parentElement.parentElement.children.item(3).firstElementChild;
  var cryptoName = e.parentElement.parentElement.parentElement.parentElement.parentElement.children.item(4).firstElementChild;

  inputField.innerText = coinlistFiltered[index].FullName;
  cryptoTicker.value = coinlistFiltered[index].Symbol;
  cryptoName.value = coinlistFiltered[index].CoinName;
  showHideDropdown1(e.parentElement.parentElement);
}