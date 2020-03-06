import { Camera as tCamera, OrthographicCamera } from "three";
import {
  OrthographicDefaultOptions,
  OrthographicOptions,
  CameraOptions
} from "../config/camera";
import merge from "lodash/merge";
import Debug from "../utils/Debug";

export interface Camera extends tCamera {
  debug: Function;
}

/**
 * 正交相机
 */
class Orthographic extends OrthographicCamera implements Camera {
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
  db: any;

  constructor(el: HTMLElement, options: OrthographicOptions) {
    const { near, far, multiple } = options;
    const halfWidth = (el.offsetWidth >> 1) * multiple;
    const halfHeight = (el.offsetHeight >> 1) * multiple;
    super(-halfWidth, halfWidth, halfHeight, -halfHeight, near, far);
    this.options = options;
    this.el = el;
  }

  debug() {
    if (!this.db) {
      console.log(this);
      this.db = new Debug().add("相机", this.options);
    }
    const {
      db: { near, far, x, y, z, multiple },
      el
    } = this;
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
export class CameraFactory {
  /**
   * 挂载元素
   */
  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
  }
  /**
   * 获取相机
   * @param type 相机类型
   * @param options 相机配置
   */
  getCamera(type: CameraType, options?: CameraOptions): Camera {
    let camera: Camera;
    const mergeOptions = merge(options, OrthographicDefaultOptions);
    if (type === CameraType.Orthographic) {
      camera = new Orthographic(this.el, mergeOptions);
    } else {
      throw new Error("请传入正确的相机类型");
    }
    return camera;
  }
}
