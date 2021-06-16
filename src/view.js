export default class View {
  constructor() {
    this.container = document.createElement("div");
    this.container.setAttribute("class", "container");
    this.input = document.createElement("input");
    this.input.setAttribute("placeholder", "Enter city name...");
    this.buttonSearch = document.createElement("button");
    this.buttonSearch.className = "search";
    this.buttonSearch.setAttribute("name", "Search");
    this.div = document.createElement("div");
    this.div.className = "inputDiv";
    this.footer = document.createElement("div");
    this.wrapper = document.createElement("div");
    this.wrapper.className = "wrapper";
    this.currencyDiv = document.createElement("div");
    this.localWeather = document.createElement("div");
    this.footer.className = "footer";
    this.currencyDiv.className = "footerDivs";
    this.localWeather.className = "footerDivs";
    this.localWeather.setAttribute("name", "LOCAL");
    this.currencyDiv.setAttribute("name", "CURRENCY");
    this.currencyDiv.classList.add("shake");
    this.localWeather.classList.add("shake");
    this.clock = document.createElement("div");
    this.clock.className = "footerDivs";
  }
  displayFirstPage() {
    this.div.append(this.input, this.buttonSearch);
    document.body.append(this.wrapper);
    this.wrapper.append(this.div, this.container, this.footer);
    this.footer.append(this.localWeather, this.clock, this.currencyDiv);
    this.currencyDiv.innerHTML = `<h1>Click To know Currency</h1>`;
  }
  postData = (obj) => {
    let newCity = document.createElement("div");
    newCity.setAttribute("class", "taskDiv");
    newCity.setAttribute("id", obj.id);
    this.container.append(newCity);
    this.divAnimate(newCity);
    this.drawingDiv(newCity, obj);
  };
  drawingDiv(newCity, obj) {
    newCity.innerHTML = "";
    let id = newCity.getAttribute("id");
    let edit = document.createElement("button");
    edit.innerHTML = "";
    edit.className = "edit";
    edit.setAttribute("id", id);
    edit.setAttribute("name", "EDIT");

    let deleteCurrentCity = document.createElement("button");
    deleteCurrentCity.innerHTML = "X";
    deleteCurrentCity.setAttribute("name", "deleteCurrentButton");
    deleteCurrentCity.className = "deleteCurrentButton";
    deleteCurrentCity.setAttribute("id", id);
    let celsius = Math.round(obj.main.temp - 273.13);
    newCity.innerHTML = `<h1>${obj.name}: ${celsius}°</h1> <img>`;
    newCity.childNodes[2].className = "weatherImage";
    this.drawingWeatherImg(obj, newCity.childNodes[2]);
    newCity.append(edit, deleteCurrentCity);
  }

  drawingWeatherImg(obj, img) {
    obj.weather === "Clear"
      ? img.setAttribute("src", "http://openweathermap.org/img/wn/01d.png")
      : obj.weather === "Clouds"
      ? img.setAttribute("src", "http://openweathermap.org/img/wn/03d.png")
      : img.setAttribute("src", "http://openweathermap.org/img/wn/03d.png");
  }
  divAnimate(newCity) {
    newCity.animate(
      {
        opacity: "0",
        opacity: "1",
      },

      { duration: 2000, fill: "forwards" }
    );
  }
  changeCityName(parent) {
    let editValue = document.createElement("input");
    editValue.setAttribute("placeholder", "Please enter new city name...");
    parent.innerHTML = "";
    let saveChanges = document.createElement("button");
    saveChanges.innerHTML = "";
    saveChanges.setAttribute("name", "save");
    saveChanges.className = "save";
    parent.append(editValue, saveChanges);
  }
  drawingCurreny(bankAPI) {
    this.currencyDiv.classList.remove("shake");
    this.currencyDiv.innerHTML = "";
    this.currencyDiv.innerHTML = `<p>${bankAPI[0].ccy}/${
      bankAPI[0].base_ccy
    }: ${Number(bankAPI[0].buy).toFixed(2)}/${Number(bankAPI[0].sale).toFixed(
      2
    )}</p>
      <p>${bankAPI[1].ccy}/${bankAPI[1].base_ccy}: ${Number(
      bankAPI[1].buy
    ).toFixed(2)}/${Number(bankAPI[1].sale).toFixed(2)}</p>
      <p>${bankAPI[2].ccy}/${bankAPI[2].base_ccy}: ${Number(
      bankAPI[2].buy
    ).toFixed(3)}/${Number(bankAPI[2].sale).toFixed(3)}</p>
      `;
    this.currencyDiv.childNodes[0].className = "footerDivsP";
    this.currencyDiv.childNodes[2].className = "footerDivsP";
    this.currencyDiv.childNodes[4].className = "footerDivsP";
  }
  drawingLocalCity(obj) {
    this.localWeather.classList.remove("shake");
    this.localWeather.innerHTML = "";
    console.log(obj);
    let celsius = Math.round(obj.main.temp - 273.13);
    this.localWeather.innerHTML = `<h1>${obj.name}: ${celsius}°</h1> <img>`;
    this.drawingWeatherImg(obj, this.localWeather.childNodes[2]);
  }
  drawingClock(current_time, dayOfWeek) {
    this.clock.innerHTML = `<h1>${dayOfWeek}</h1>
      <h1>${current_time}</h1>`;
  }
}
