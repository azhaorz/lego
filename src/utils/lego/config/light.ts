export const AmbientDefaultOptions: AmbientOptions = {
  color: "#ffffff",
  intensity: 0.74,
  debug: false
};
export const DirectionalDefaultOptions: DirectionalOptions = {
  color: "#3c3c3c",
  intensity: 1.02,
  x: 243,
  y: 533,
  z: 398,
  debug: false
};

/**
 * 光照配置
 */
export interface LightOptions {
  /**
   * 光照颜色
   */
  color?: string;
  /**
   * 光照强度
   */
  intensity?: number;
  /**
   * 是否开启调试
   */
  debug?: boolean;
}

/**
 * 环境光配置
 */
export type AmbientOptions = LightOptions;

export interface DirectionalOptions extends LightOptions {
  /**
   * 距离x轴的位置
   */
  x?: number;
  /**
   * 距离y轴的位置
   */
  y?: number;
  /**
   * 距离z轴的位置
   */
  z?: number;
}
