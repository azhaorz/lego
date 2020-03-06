import { BoxGeometry, MeshLambertMaterial, Color, Mesh, Group } from "three";

export default class Model {
  /**
   * 模型组
   */
  static group = new Group();
  /**
   * 场地宽度
   */
  static groundWidth: number;
  /**
   * 场地长度
   */
  static groundLength: number;

  /**
   * 创建矩形场地
   * @param options 矩形场地配置
   */
  static crtRectangleGround({
    width,
    length,
    height,
    color
  }: RectangleGroundOptions) {
    const rectangle = new BoxGeometry(width, height, length);
    const material = new MeshLambertMaterial({
      color: new Color(color)
    });
    const mesh = new Mesh(rectangle, material);
    mesh.name = "ground";
    mesh.position.set(0, -height, 0);
    Model.group.add(mesh);
    this.groundWidth = width;
    this.groundLength = length;
  }

  /**
   * 创建矩形
   * @param rectangles 矩形配置
   */
  static crtRectangle(rectangles: RectangleOptions[]) {
    let width, length, height;
    let mesh;
    for (let i = 0; i < rectangles.length; i++) {
      width = rectangles[i].width;
      length = rectangles[i].length;
      height = rectangles[i].height;
      const rectangle = new BoxGeometry(width, height, length);
      const material = new MeshLambertMaterial({
        color: new Color(rectangles[i].color)
      });

      // 透明度
      material.transparent = true;
      material.opacity = rectangles[i].opacity || 1;

      mesh = new Mesh(rectangle, material);
      mesh.name = rectangles[i].name || `rectangle-${i}`;
      mesh.position.set(
        rectangles[i].x + width / 2,
        height >> 1,
        length / 2 - rectangles[i].y
      );
      Model.group.add(mesh);
    }
  }
}

interface RectangleOptions {
  width: number;
  length: number;
  height: number;
  x: number;
  y: number;
  color: string;
  name?: string;
  opacity?: number;
}

interface RectangleGroundOptions {
  width: number;
  length: number;
  height: number;
  color: string;
}
