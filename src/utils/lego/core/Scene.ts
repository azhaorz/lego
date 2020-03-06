import { Scene, Color } from "three";
import { SceneOptions, SceneDefaultOptions } from "../config/scene";
import merge from "lodash/merge";

export enum SceneType {
  Scene = "Scene"
}

export class SceneFactory {
  /**
   * 获取相机
   * @param type 相机类型
   * @param options 相机配置
   */
  getScene(type: SceneType, options?: SceneOptions): Scene {
    let scene: Scene;
    const mergeOptions = merge(options, SceneDefaultOptions);
    if (type === SceneType.Scene) {
      scene = new Scene();
    } else {
      throw new Error("请传入正确的场景类型");
    }
    const { color } = mergeOptions;
    scene.background = new Color(color);
    return scene;
  }
}
