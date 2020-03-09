import { Light as tLight, AmbientLight, DirectionalLight, Color } from "three";
import {
  AmbientDefaultOptions,
  DirectionalDefaultOptions,
  AmbientOptions,
  DirectionalOptions,
  LightOptions
} from "../config/light";
import merge from "lodash/merge";
import { Debug, IDebug } from "./Debug";
import Lego from "./Lego";

interface DebugLight extends IDebug, tLight {}

/**
 * 光照类型
 */
export enum LightType {
  Ambient = "Ambient",
  Directional = "Directional"
}

/**
 * 环境光
 */
class Ambient extends AmbientLight implements DebugLight {
  /**
   * 配置项
   */
  options: AmbientOptions;
  /**
   * debug对象
   */
  db: any;

  constructor(options: AmbientOptions) {
    super(new Color(options.color));
    this.name = LightType.Ambient;
    this.options = options;
  }

  debug = () => {
    if (!this.db) {
      this.db = new Debug().add("环境光", this.options);
    }
    const {
      db: { color, intensity }
    } = this;
    this.color.set(color);
    this.intensity = intensity;
  };
}

class Directional extends DirectionalLight implements DebugLight {
  /**
   * 配置项
   */
  options: DirectionalOptions;
  /**
   * debug对象
   */
  db: any;
  constructor(options: DirectionalOptions) {
    super(new Color(options.color), options.intensity);
    this.name = LightType.Directional;
    this.position.set(options.x, options.y, options.z);
    this.options = options;
  }

  debug = () => {
    if (!this.db) {
      console.log(this);
      this.db = new Debug().add("平行光", this.options);
    }
    const {
      db: { color, intensity, x, y, z }
    } = this;
    this.color.set(color);
    this.intensity = intensity;
    this.position.set(x, y, z);
  };
}

/**
 * 光照工厂类
 */
export class Light {
  /**
   * Lego实例
   */
  lego: Lego;
  constructor(lego: Lego) {
    this.lego = lego;
  }

  /**
   * 获取光照
   * @param type 光照类型
   * @param options 光照配置
   */
  crtLight(type: LightType, options?: LightOptions): DebugLight {
    let light: DebugLight;
    let mergeOptions = null;

    if (type === LightType.Ambient) {
      // 环境光
      mergeOptions = merge(AmbientDefaultOptions, options);
      light = new Ambient(mergeOptions);
    } else if (type === LightType.Directional) {
      // 平行光
      mergeOptions = merge(DirectionalDefaultOptions, options);
      light = new Directional(mergeOptions);
    } else {
      throw new Error("请传入正确的光照类型");
    }

    mergeOptions.debug && this.lego.debugList.push(light.debug);
    return light;
  }
}
