import { Scene as tScene, Color } from "three";
import { SceneOptions, SceneDefaultOptions } from "../config/scene";
import merge from "lodash/merge";

export enum SceneType {
  Scene = "Scene"
}

export class Scene {
  /**
   * 获取相机
   * @param type 相机类型
   * @param options 相机配置
   */
  crtScene(type: SceneType, options?: SceneOptions): tScene {
    let scene: tScene;
    const mergeOptions = merge(options, SceneDefaultOptions);
    if (type === SceneType.Scene) {
      scene = new tScene();
    } else {
      throw new Error("请传入正确的场景类型");
    }
    const { color } = mergeOptions;
    scene.background = new Color(color);
    return scene;
  }
}
