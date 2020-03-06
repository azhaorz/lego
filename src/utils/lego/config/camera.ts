export const OrthographicDefaultOptions: OrthographicOptions = {
  near: 0,
  far: 1000,
  multiple: 1,
  x: 300,
  y: 300,
  z: 300
};

/**
 * 相机配置
 */
export interface CameraOptions {
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
}

/**
 * 正交相机配置
 */
export interface OrthographicOptions extends CameraOptions {
  multiple: number;
}
