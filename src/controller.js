export default class Controller {
  constructor(model) {
    this.model = model;
  }
  initialization() {
    this.model.view.displayFirstPage();
    this.model.loadingFirstPage();
    this.clickOnButtons();
    this.model.view.currencyDiv.addEventListener("click", (event) => {
      this.model.getCurrencyData();
    });
  }
  clickOnButtons() {
    document.body.addEventListener("click", (event) => {
      this.model.checkButtons(event.target);
    });
  }
}
