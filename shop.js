(function() {

  var topPot = function(name, minCustHour, maxCustHour, avgDonutsCust) {
    this.name = name;
    this.minCustHour = minCustHour;
    this.maxCustHour = maxCustHour;
    this.avgDonutsCust = avgDonutsCust;
    this.hoursOfOper = 11;
    this.randomCust = [];
    this.donutsHour = [];
    this.donutsDay = 0;
  }

  topPot.prototype.generateRandom = function() {
    for (var i = 0; i < this.hoursOfOper; i++) {
      this.randomCust[i] = Math.floor(Math.random() * (this.maxCustHour - this.minCustHour + 1)) + this.minCustHour;
    }
  }

  topPot.prototype.donutsHourCalc = function() {
    for (var i = 0; i < this.randomCust.length; i++) {
      this.donutsHour[i] = Math.round(this.randomCust[i] * this.avgDonutsCust);
    }
  }

  topPot.prototype.donutsDayCalc = function() {
    this.donutsDay = 0;
    for (var i = 0; i < this.donutsHour.length; i++) {
      this.donutsDay += this.donutsHour[i];
    }
  }

  topPot.prototype.renderRow = function() {
    var row = document.createElement("tr");
    var header = document.createElement("th");
    var total = document.createElement("td");

    header.textContent = this.name;
    total.textContent = this.donutsDay;

    document.getElementById("donut-estimate").appendChild(row);
    document.getElementById("donut-estimate").lastChild.appendChild(header);

    for (var i = 0; i < this.donutsHour.length; i++) {
      var data = document.createElement("td");
      data.textContent = this.donutsHour[i];
      document.getElementById("donut-estimate").lastChild.appendChild(data);
    }

    document.getElementById("donut-estimate").lastChild.appendChild(total);
  }

  topPot.prototype.renderOption = function(index) {
    var updateOption = document.createElement("option");
    var removeOption = document.createElement("option");

    updateOption.textContent = this.name;
    updateOption.value = index;
    updateOption.setAttribute("class", "update");
    removeOption.textContent = this.name;
    removeOption.value = index;
    removeOption.setAttribute("class", "remove");

    document.getElementById("update-dropdown").appendChild(updateOption);
    document.getElementById("remove-dropdown").appendChild(removeOption);
  }

  var shops = [];

  shops.push(new topPot("Downtown", 8, 43, 4.5));
  shops.push(new topPot("Capitol Hill", 4, 37, 2));
  shops.push(new topPot("S. Lake Union", 9, 23, 6.33));
  shops.push(new topPot("Wedgwood", 2, 28, 1.25));
  shops.push(new topPot("Ballard", 8, 58, 3.75));

  var generateCalc = function() {
    for (var i = 0; i < shops.length; i++) {
      shops[i].generateRandom();
      shops[i].donutsHourCalc();
      shops[i].donutsDayCalc();
    }
  }

  var renderTable = function() {
    for (var i = 0; i < shops.length; i++) {
      shops[i].renderRow();
    }
  }

  var renderDropdown = function() {
    for (var i = 0; i < shops.length; i++) {
      shops[i].renderOption(i);
    }
  }

  var addNewShop = function() {
    var locationAdd = document.getElementById("location-add");
    var minCustAdd = document.getElementById("min-cust-add");
    var maxCustAdd = document.getElementById("max-cust-add");
    var avgDonutsAdd = document.getElementById("avg-donuts-cust-add");

    if (locationAdd.value && minCustAdd.value && maxCustAdd.value && avgDonutsAdd.value) {
      var addShop = new topPot(locationAdd.value, parseFloat(minCustAdd.value), parseFloat(maxCustAdd.value), parseFloat(avgDonutsAdd.value));
      addShop.generateRandom();
      addShop.donutsHourCalc();
      addShop.donutsDayCalc();

      shops.push(addShop);

      addShop.renderRow();
      addShop.renderOption(shops.length - 1);

      // locationAdd.value = "";
      // minCustAdd.value = "";
      // maxCustAdd.value = "";
      // avgDonutsAdd.value = "";
    }

    console.log(shops);
  }

  var populateUpdate = function() {
    var populateDropdown = document.getElementById("update-dropdown");
    var locationPopulate = document.getElementById("location-update");
    var minCustPopulate = document.getElementById("min-cust-update");
    var maxCustPopulate = document.getElementById("max-cust-update");
    var avgDonutsPopulate = document.getElementById("avg-donuts-cust-update");
    var shopToPopulate = shops[populateDropdown.value];

    locationPopulate.value = shopToPopulate.name;
    minCustPopulate.value = shopToPopulate.minCustHour;
    maxCustPopulate.value = shopToPopulate.maxCustHour;
    avgDonutsPopulate.value = shopToPopulate.avgDonutsCust;

    console.log(populateDropdown.value);
  }

  var updateShop = function() {
    var updateDropdown = document.getElementById("update-dropdown");
    var locationUpdate = document.getElementById("location-update");
    var minCustUpdate = document.getElementById("min-cust-update");
    var maxCustUpdate = document.getElementById("max-cust-update");
    var avgDonutsUpdate = document.getElementById("avg-donuts-cust-update");
    var updateOptionList = document.getElementsByClassName("update");
    var removeOptionList = document.getElementsByClassName("remove");
    var shopToUpdate = shops[updateDropdown.value];

    if (locationUpdate.value && minCustUpdate.value && maxCustUpdate.value && avgDonutsUpdate.value) {
      shopToUpdate.name = locationUpdate.value;
      shopToUpdate.minCustHour = parseFloat(minCustUpdate.value);
      shopToUpdate.maxCustHour = parseFloat(maxCustUpdate.value);
      shopToUpdate.avgDonutsCust = parseFloat(avgDonutsUpdate.value);

      shopToUpdate.generateRandom();
      shopToUpdate.donutsHourCalc();
      shopToUpdate.donutsDayCalc();

      document.getElementById("donut-estimate").innerHTML = "";
      renderTable();

      updateOptionList[updateDropdown.value].textContent = locationUpdate.value;
      removeOptionList[updateDropdown.value].textContent = locationUpdate.value;

      // updateDropdown.value = "";
      // locationUpdate.value = "";
      // minCustUpdate.value = "";
      // maxCustUpdate.value = "";
      // avgDonutsUpdate.value = "";
    }

    console.log(shops);
  }

  var removeShop = function() {
    var updateDropdown = document.getElementById("update-dropdown");
    var removeDropdown = document.getElementById("remove-dropdown");
    var updateOptionList = document.getElementsByClassName("update");
    var removeOptionList = document.getElementsByClassName("remove");

    if (removeDropdown.value) {
      if (confirm("Permanently remove the " + shops[removeDropdown.value].name + " store?")) {
        shops.splice(removeDropdown.value, 1);

        for (var i = 0; i <= shops.length; i++) {
          updateDropdown.removeChild(updateOptionList[0]);
          removeDropdown.removeChild(removeOptionList[0]);
        }

        document.getElementById("donut-estimate").innerHTML = "";
        renderTable();

        renderDropdown();
        removeDropdown.value = "";
        updateDropdown.value = "";
      } else {
        removeDropdown.value = "";
      }
    }

    console.log(shops);
  }

  var addButton = document.getElementById("add");
  var updateDropdown = document.getElementById("update-dropdown");
  var updateButton = document.getElementById("update");
  var removeButton = document.getElementById("remove");

  addButton.addEventListener("click", addNewShop, false);
  updateDropdown.addEventListener("change", populateUpdate, false);
  updateButton.addEventListener("click", updateShop, false);
  removeButton.addEventListener("click", removeShop, false);

  generateCalc();

  renderTable();

  renderDropdown();

  console.log(shops);

})()
