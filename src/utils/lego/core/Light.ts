import { Light as tLight, AmbientLight, DirectionalLight } from "three";
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
  static db: AmbientOptions | null = null;

  constructor(options: AmbientOptions) {
    super();
    this.name = LightType.Ambient;
    this.set(options);
    this.options = options;
  }

  set(options: AmbientOptions) {
    this.color.set(options.color as string);
    this.intensity = options.intensity as number;
  }

  debug = () => {
    if (!Ambient.db) {
      Ambient.db = new Debug().add("环境光", this.options);
    }
    this.set(Ambient.db);
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
  static db: DirectionalOptions | null = null;
  constructor(options: DirectionalOptions) {
    super();
    this.name = LightType.Directional;
    this.set(options);
    this.options = options;
  }

  set(options: DirectionalOptions) {
    this.color.set(options.color as string);
    this.intensity = options.intensity as number;
    this.position.set(
      options.x as number,
      options.y as number,
      options.z as number
    );
  }

  debug = () => {
    if (!Directional.db) {
      Directional.db = new Debug().add("平行光", this.options);
    }
    this.set(Directional.db);
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
      console.log(mergeOptions);

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
