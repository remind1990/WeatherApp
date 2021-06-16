import View from "./view.js";
import Model from "./model.js";
import Controller from "./controller.js";
import "./style.css";
import pencil from "./images/pencil1.svg";
import pencil2 from "./images/pencil2.svg";
import save from "./images/save.png";
import search from "./images/search.png";

document.addEventListener("DOMContentLoaded", () => {
  let view = new View();
  let model = new Model(view);
  let controller = new Controller(model);
  let timerID = setInterval(() => model.clockTimer(), 1000);

  controller.initialization();
});
