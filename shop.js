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

  var shops = [];

  shops.push(new topPot("Downtown", 8, 43, 4.5));
  shops.push(new topPot("Capitol Hill", 4, 37, 2));
  shops.push(new topPot("S. Lake Union", 9, 23, 6.33));
  shops.push(new topPot("Wedgewood", 2, 28, 1.25));
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

  var addNewShop = function() {
    var locationName = document.getElementById("location");
    var minCust = document.getElementById("min-cust");
    var maxCust = document.getElementById("max-cust");
    var avgDonuts = document.getElementById("avg-donuts-cust");
    var newShop = new topPot(locationName.value, parseInt(minCust.value), parseInt(maxCust.value), parseInt(avgDonuts.value))

    //Add code to check for blank fields!

    newShop.generateRandom();
    newShop.donutsHourCalc();
    newShop.donutsDayCalc();

    shops.push(newShop);

    newShop.renderRow();

    console.log(shops);
  }

  var updateShop = function() {
    var locationUpdate = document.getElementById("location-update");
    var minCustUpdate = document.getElementById("min-cust-update");
    var maxCustUpdate = document.getElementById("max-cust-update");
    var avgDonutsUpdate = document.getElementById("avg-donuts-cust-update");

    for (var i = 0; i < shops.length; i++) {
      if (locationUpdate.value === shops[i].name) {
        if (minCustUpdate.value) {
          shops[i].minCustHour = parseInt(minCustUpdate.value);
          if (maxCustUpdate.value) {
            shops[i].maxCustHour = parseInt(maxCustUpdate.value);
            if (avgDonutsUpdate.value) {
              shops[i].avgDonutsCust = parseInt(avgDonutsUpdate.value);
            }
          } else if (avgDonutsUpdate.value) {
            shops[i].avgDonutsCust = parseInt(avgDonutsUpdate.value);
          }
        } else if (maxCustUpdate.value) {
          shops[i].maxCustHour = parseInt(maxCustUpdate.value);
          if (avgDonutsUpdate.value) {
            shops[i].avgDonutsCust = parseInt(avgDonutsUpdate.value);
          }
        } else if (avgDonutsUpdate.value) {
          shops[i].avgDonutsCust = parseInt(avgDonutsUpdate.value);
        }
        shops[i].generateRandom();
        shops[i].donutsHourCalc();
        shops[i].donutsDayCalc();
      }

      document.getElementById("donut-estimate").innerHTML = "";
      renderTable();
    }

    console.log(shops);
  }

  var submitButton = document.getElementById("submit");
  var updateButton = document.getElementById("update");

  submitButton.addEventListener("click", addNewShop, false);
  updateButton.addEventListener("click", updateShop, false);

  generateCalc();

  renderTable();

  console.log(shops);

})()
