export const OrthographicDefaultOptions: OrthographicOptions = {
  near: 1,
  far: 10000,
  multiple: 2,
  x: 900,
  y: 900,
  z: 900,
  debug: false
};

/**
 * 相机配置
 */
export interface CameraOptions {
  /**
   * 摄像机视锥体近端面
   */
  near?: number;
  /**
   * 摄像机视锥体远端面
   */
  far?: number;
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
  /**
   * 是否开启调试
   */
  debug?: boolean;
}

/**
 * 正交相机配置
 */
export interface OrthographicOptions extends CameraOptions {
  multiple: number;
  /**
   * 摄像机视锥体近端面
   */
  near: number;
  /**
   * 摄像机视锥体远端面
   */
  far: number;
  /**
   * 距离x轴的位置
   */
  x: number;
  /**
   * 距离y轴的位置
   */
  y: number;
  /**
   * 距离z轴的位置
   */
  z: number;
  /**
   * 是否开启调试
   */
  debug: boolean;
}
