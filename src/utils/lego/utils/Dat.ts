import dat from "dat.gui";

export default class Dat {
  /**
   * dat.gui实例
   */
  gui: dat.GUI;

  constructor() {
    this.gui = new dat.GUI();
  }

  /**
   * 相机配置
   * @param x x轴位置
   * @param y y轴位置
   * @param z z轴位置
   */
  camera({ x, y, z }: { x: number; y: number; z: number }) {
    class C {
      x: number;
      y: number;
      z: number;
      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }
    const control = new C(x, y, z);
    const f = this.gui.addFolder("camera");
    f.add(control, "x", -500, 500);
    f.add(control, "y", -500, 500);
    f.add(control, "z", -1000, 1000);
    return control;
  }

  /**
   * 场地配置（顺时针旋转）
   * @param rx x轴旋转角度
   * @param ry y轴旋转角度
   * @param rz z轴旋转角度
   */
  ground({ rx, ry, rz }: { rx: number; ry: number; rz: number }) {
    class C {
      rx: number;
      ry: number;
      rz: number;
      constructor(x: number, y: number, z: number) {
        this.rx = x;
        this.ry = y;
        this.rz = z;
      }
    }
    const control = new C(rx, ry, rz);
    const f = this.gui.addFolder("ground");
    f.add(control, "rx", 0, Math.PI);
    f.add(control, "ry", 0, Math.PI);
    f.add(control, "rz", 0, Math.PI);
    return control;
  }

  /**
   * 相机配置
   * @param x x轴位置
   * @param y y轴位置
   * @param z z轴位置
   */
  light({ x, y, z }: { x: number; y: number; z: number }) {
    class C {
      x: number;
      y: number;
      z: number;
      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }
    const control = new C(x, y, z);
    const f = this.gui.addFolder("light");
    f.add(control, "x", -3000, 3000);
    f.add(control, "y", 0, 10000);
    f.add(control, "z", 0, 10000);
    return control;
  }
}
