import { Scene, GridHelper } from "three";
import Stats from "stats.js";
import Model from "../core/Model";

export default class Helper {
  el: HTMLElement;
  scene: Scene;

  constructor(scene: Scene, el: HTMLElement) {
    this.scene = scene;
    this.el = el;
  }

  addGrid(divisions: number) {
    const gridHelper = new GridHelper(
      Math.max(Model.groundWidth, Model.groundLength),
      divisions
    );
    this.scene.add(gridHelper);
  }

  addStats(type: number): Function {
    const stats = new Stats();
    stats.showPanel(type);
    this.el.appendChild(stats.dom);
    return stats.update.bind(stats);
  }
}
