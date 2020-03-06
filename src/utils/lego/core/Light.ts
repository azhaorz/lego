import { Light as tLight, AmbientLight, DirectionalLight, Color } from "three";
import {
  AmbientDefaultOptions,
  DirectionalDefaultOptions,
  AmbientOptions,
  DirectionalOptions,
  LightOptions
} from "../config/light";
import merge from "lodash/merge";
import Debug from "../utils/Debug";

export interface Light extends tLight {
  debug: Function;
}

/**
 * 环境光
 */
class Ambient extends AmbientLight implements Light {
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
    this.options = options;
  }

  debug() {
    if (!this.db) {
      console.log(this);
      this.db = new Debug().add("环境光", this.options);
    }
    const {
      db: { color, intensity }
    } = this;
    this.color.set(color);
    this.intensity = intensity;
  }
}

class Directional extends DirectionalLight implements Light {
  /**
   * 配置项
   */
  options: DirectionalOptions;
  /**
   * debug对象
   */
  db: any;
  constructor(options: DirectionalOptions) {
    const { color, intensity, x, y, z } = options;
    super(new Color(color), intensity);
    this.position.set(x, y, z);
    this.options = options;
  }

  debug() {
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
  }
}

/**
 * 光照类型
 */
export enum LightType {
  Ambient = "Ambient",
  Directional = "Directional"
}

/**
 * 光照工厂类
 */
export class LightFactory {
  /**
   * 获取光照
   * @param type 光照类型
   * @param options 光照配置
   */
  getLight(type: LightType, options?: LightOptions): Light {
    let light: Light;
    let mergeOptions = null;

    if (type === LightType.Ambient) {
      // 环境光
      mergeOptions = merge(options, AmbientDefaultOptions);
      light = new Ambient(mergeOptions);
    } else if (type === LightType.Directional) {
      // 平行光
      mergeOptions = merge(options, DirectionalDefaultOptions);
      light = new Directional(mergeOptions);
    } else {
      throw new Error("请传入正确的光照类型");
    }

    return light;
  }
}
