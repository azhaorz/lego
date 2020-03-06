import { Camera } from "three";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * 控制器类型
 */
export enum ControlType {
  MapControls = "MapControls"
}

/**
 * 控制器工厂类
 */
export class ControlFactory {
  /**
   * 挂载元素
   */
  el: HTMLElement;
  /**
   * 相机
   */
  camera: Camera;

  constructor(el: HTMLElement, camera: Camera) {
    this.el = el;
    this.camera = camera;
  }
  /**
   * 获取控制器
   * @param type 控制器类型
   */
  getControl(type: ControlType): MapControls {
    let control: MapControls;
    if (type === ControlType.MapControls) {
      control = new MapControls(this.camera, this.el);
    } else {
      throw new Error("请传入正确的控制器类型");
    }
    return control;
  }
}
