export default class Model {
  constructor(view) {
    (this.view = view),
      (this.url = "https://60b608fefe923b0017c852b1.mockapi.io/api/v1/remind"),
      (this.privatBank =
        "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");
  }
  clockTimer() {
    let date = new Date();

    let time = [date.getHours(), date.getMinutes(), date.getSeconds()];
    let dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let days = date.getDay();
    if (time[0] < 10) {
      time[0] = "0" + time[0];
    }
    if (time[1] < 10) {
      time[1] = "0" + time[1];
    }
    if (time[2] < 10) {
      time[2] = "0" + time[2];
    }

    let current_time = [time[0], time[1], time[2]].join(":");
    this.view.drawingClock(current_time, dayOfWeek[days]);
  }
  checkData = () => {
    let input = this.view.input.value;
    if (input.trim() === "" || input.match(/\d+/g) || input.match(/[А-я]+/g)) {
      alert("ошибка ввода");
    } else {
      this.getData(input);
      this.view.input.value = "";
    }
  };
  sendServerData = (weatherCity) => {
    let city = {
      name: weatherCity.name,
      main: {
        temp: weatherCity.main["temp"],
      },
      weather: weatherCity.weather[0].main,
    };
    let promise = fetch(`${this.url}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(city),
    })
      .then((res) => this.getServerData())
      .then((res) => res.find((item) => item.name === weatherCity.name))
      .then((res) => this.view.postData(res));
  };

  async getServerData() {
    let data = fetch(`${this.url}`);
    let info = await data.then((res) => res.json());
    return info;
  }
  getData = (city) => {
    let data = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e50ec27dac6fac01c3d6889743f8b9d5`
    );
    data
      .then((res) => res.json())
      .then((obj) => {
        this.sendServerData(obj);
      });
  };

  deleteOne(elementID) {
    let promise = fetch(`${this.url}/${elementID}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
    });
    promise.then(() => {
      let el = document.getElementById(elementID);
      el.remove();
    });
  }
  editDatas(parent, city) {
    if (city != null && city.length > 0) {
      let data = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e50ec27dac6fac01c3d6889743f8b9d5`
      )
        .then((res) => res.json())
        .then((obj) => {
          let newCity = {
            name: obj.name,
            main: {
              temp: obj.main["temp"],
            },
            weather: obj.weather[0].main,
          };
          fetch(`${this.url}/${parent.id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(newCity),
          }).then(() => this.view.drawingDiv(parent, newCity));
        });
    }
  }
  getCurrencyData() {
    let promise = fetch(`${this.privatBank}`);
    promise
      .then((res) => res.json())
      .then((bankAPI) => this.view.drawingCurreny(bankAPI));
  }
  async loadingFirstPage() {
    this.view.container.innerHTML = "";
    let cities = await this.getServerData();
    if (cities.length > 0) {
      cities.forEach((element) => {
        this.view.postData(element);
      });
    }
  }
  getGeolocation(successCallback) {
    let coords = successCallback.coords;
    let lat = coords.latitude;
    let lon = coords.longitude;

    let data = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(
        2
      )}&lon=${lon.toFixed(2)}&appid=e50ec27dac6fac01c3d6889743f8b9d5`
    );
    data
      .then((res) => res.json())
      .then((obj) => this.view.drawingLocalCity(obj));
  }

  checkButtons(target) {
    switch (target.getAttribute("name")) {
      case "Search":
        target.animate(
          [
            { backgroundColor: "#ffffff", color: "black" },
            { backgroundColor: "#90f390", color: "white" },
          ],
          { duration: 3000, fill: "forwards", direction: "reverse" }
        );
        this.checkData();
        break;
      case "deleteCurrentButton":
        target.parentNode.animate([{ width: "100%" }, { width: "0%" }], {
          duration: 500,
          fill: "forwards",
        });
        setTimeout(this.deleteOne(target.parentNode.id), 500);

        break;
      case "EDIT":
        this.view.changeCityName(target.parentNode);
        break;
      case "save":
        this.editDatas(target.parentNode, target.previousSibling.value);
        break;
      case "CURRENCY":
        this.getCurrencyData(target);
        break;
      case "LOCAL":
        navigator.geolocation.getCurrentPosition(
          (successCallback, errorCallback) => {
            if (successCallback) {
              this.getGeolocation(successCallback);
            }
            if (errorCallback) {
              console.log(errorCallback);
            }
          }
        );
    }
  }
}
