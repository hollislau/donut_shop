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
    for (var i = 0; i < this.donutsHour.length; i++) {
      this.donutsDay += this.donutsHour[i];
    }
  }

  topPot.prototype.renderRow = function(index) {
    var row = document.createElement("tr");
    var header = document.createElement("th");
    var total = document.createElement("td");

    header.textContent = this.name;
    total.textContent = this.donutsDay;

    document.getElementById("donut-estimate").appendChild(row);
    document.getElementsByTagName("tr")[index].appendChild(header);

    for (var i = 0; i < this.donutsHour.length; i++) {
      var data = document.createElement("td");
      data.textContent = this.donutsHour[i];
      document.getElementsByTagName("tr")[index].appendChild(data);
    }

    document.getElementsByTagName("tr")[index].appendChild(total);
  }

  var shops = [new topPot("Downtown", 8, 43, 4.5), new topPot("Capitol Hill", 4, 37, 2), new topPot("South Lake Union", 9, 23, 6.33),
               new topPot("Wedgewood", 2, 28, 1.25), new topPot("Ballard", 8, 58, 3.75)];

  for (var i = 0; i < shops.length; i++) {
    shops[i].generateRandom();
    shops[i].donutsHourCalc();
    shops[i].donutsDayCalc();
    shops[i].renderRow(i+1);
  }

  console.log(shops);

})()
