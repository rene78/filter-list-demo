//Fill out coin list array with all coin options on load
var coinlistFiltered = coinlist;

var locNumber;
function filterCoins(e) {

  //console.log(window.event);
  // var event = window.event
  // var event = window.event ? window.event : e;
  //console.log(event);
  var allToken = window.event.path[0].nextElementSibling.children;
  //console.log(allToken);
  //console.log(event.keyCode)
  if (event.keyCode == '38') {
    console.log("Up arrow");
    if (locNumber > 0) {
      locNumber--;
      console.log("locNumber", locNumber);
      // allToken[locNumber].style.backgroundColor = "#ddd";
      allToken[locNumber].classList.add("active");
      if (locNumber < allToken.length) {
        // allToken[locNumber + 1].style.backgroundColor = null;
        allToken[locNumber + 1].classList.remove("active");
      }
    }
    return;
  }
  else if (event.keyCode == '40') {
    console.log("Down arrow");
    if (locNumber < allToken.length - 1) {
      locNumber++;
      console.log("locNumber", locNumber);
      // allToken[locNumber].style.backgroundColor = "#ddd";
      allToken[locNumber].classList.add("active");
      if (locNumber > 0) {
        // allToken[locNumber - 1].style.backgroundColor = null;
        allToken[locNumber - 1].classList.remove("active");
      }
    }
    return;
  }
  else if (event.keyCode == '13') {
    console.log("Enter");
    console.log(allToken[locNumber])
    //If Arrow up/down has not been used: Select uppermost coin. Else forward the selected coin.
    if (locNumber > -1) {
      writeToNameField(allToken[locNumber], locNumber);
    } else {
      writeToNameField(allToken[0], 0);
    }

    return;
  }
  else if (event.keyCode == '27') {
    console.log("Escape");
    showHideDropdown(e.parentElement);
  }

  var input = e.value.toUpperCase();
  // console.log(input);
  coinlistFiltered = coinlist.filter(function (coin) {
    if (coin.FullName.toUpperCase().indexOf(input) > -1) {
      return coin;
    }
  });
  //console.log(coinlistFiltered);
  createOptions(e);
  locNumber = -1; //Reset counter so that after typing the first press of Arrow down starts at the top
}

//Create options for dropdown menu.
function createOptions(e) {
  var option = "";
  if (coinlistFiltered.length > 0) {
    for (index in coinlistFiltered) {
      option += "<a href='javascript:void(0)' onclick='writeToNameField(this, " + index + ")'>" + coinlistFiltered[index].FullName + "</option>";
      //Limit amount of tokens shown to 6
      if (index >= 5) {
        break;
      }
    }
  } else {
    option = "<a href='javascript:void(0)' class='nothing-found'>Nothing found...</option>";
  }

  var tokenContainer = e.closest(".token-row").querySelector('.all-token');
  //console.log(tokenContainer);
  tokenContainer.innerHTML = option;
}

//When the user clicks on the text field, toggle between hiding and showing the dropdown content. Remove old text in input field
function showHideDropdown(e) {
  var dropDownContent = e.closest(".token-row").querySelector(".dropdown-content");
  dropDownContent.classList.toggle("show");
  var searchField = e.closest(".token-row").querySelector(".my-input");
  //console.log(searchField);
  searchField.value = "";
  searchField.focus();
  searchField.scrollIntoView();
  coinlistFiltered = coinlist; //Reset coinlistFiltered
  locNumber = -1; //Reset arrow up/down counter
}

function writeToNameField(e, index) {
  /*var fullName = coinlistFiltered[index].FullName;
  console.log(fullName);*/
  var dropdownName = e.closest(".token-row").querySelector(".dropdown-button");
  var cryptoTicker = e.closest(".token-row").querySelector('.crypto-ticker');
  var cryptoName = e.closest(".token-row").querySelector('.crypto-name');

  dropdownName.innerHTML = coinlistFiltered[index].FullName + "<div class='triangle-down'></div>";
  cryptoTicker.value = coinlistFiltered[index].Symbol;
  cryptoName.value = coinlistFiltered[index].CoinName;
  showHideDropdown(e.closest(".token-row").querySelector(".dropdown-button"));
}