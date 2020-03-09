import { Camera as tCamera, OrthographicCamera } from "three";
import {
  OrthographicDefaultOptions,
  OrthographicOptions,
  CameraOptions
} from "../config/camera";
import merge from "lodash/merge";
import { Debug, IDebug } from "./Debug";
import Lego from "./Lego";

interface DebugCamera extends IDebug, tCamera {}

/**
 * 正交相机
 */
class Orthographic extends OrthographicCamera {
  /**
   * 配置项
   */
  options: OrthographicOptions;
  /**
   * 挂载元素
   */
  el: HTMLElement;
  /**
   * debug对象
   */
  static db: OrthographicOptions | null = null;

  constructor(el: HTMLElement, options: OrthographicOptions) {
    // @ts-ignore
    super();
    this.options = options;
    this.el = el;
    this.set(options);
  }

  set(options: OrthographicOptions) {
    const { near, far, x, y, z, multiple } = options;
    const { el } = this;

    const halfWidth = (el.offsetWidth >> 1) * multiple;
    const halfHeight = (el.offsetHeight >> 1) * multiple;
    this.position.set(x, y, z);
    this.near = near;
    this.far = far;
    this.left = -halfWidth;
    this.right = halfWidth;
    this.top = halfHeight;
    this.bottom = -halfHeight;
    this.updateProjectionMatrix();
  }

  debug = () => {
    if (!Orthographic.db) {
      Orthographic.db = new Debug().add<OrthographicOptions>(
        "相机",
        this.options
      );
    }
    this.set(Orthographic.db);
  };
}

/**
 * 相机类型
 */
export enum CameraType {
  Orthographic = "Orthographic"
}

/**
 * 相机工厂类
 */
export class Camera {
  /**
   * 挂载元素
   */
  el: HTMLElement;
  /**
   * Lego实例
   */
  lego: Lego;

  constructor(el: HTMLElement, lego: Lego) {
    this.el = el;
    this.lego = lego;
  }
  /**
   * 获取相机
   * @param type 相机类型
   * @param options 相机配置
   */
  crtCamera(type: CameraType, options?: CameraOptions): DebugCamera {
    let camera: DebugCamera;
    const mergeOptions = merge(OrthographicDefaultOptions, options);
    if (type === CameraType.Orthographic) {
      camera = new Orthographic(this.el, mergeOptions);
    } else {
      throw new Error("请传入正确的相机类型");
    }

    mergeOptions.debug && this.lego.debugList.push(camera.debug);
    camera.name = "camera";
    return camera;
  }
}
