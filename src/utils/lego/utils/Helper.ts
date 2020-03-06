import { Scene, GridHelper } from "three";
import Model from "../core/Model";

export default class Helper {
  scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  crtGrid(divisions: number) {
    const gridHelper = new GridHelper(
      Math.max(Model.groundWidth, Model.groundLength),
      divisions
    );
    this.scene.add(gridHelper);
  }
}
