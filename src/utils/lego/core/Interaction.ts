import {
  Raycaster,
  Vector2,
  Camera,
  Scene,
  Intersection,
  Mesh,
  MeshLambertMaterial
} from "three";

export default class Interaction {
  camera: Camera;
  scene: Scene;
  constructor(camera: Camera, scene: Scene) {
    this.camera = camera;
    this.scene = scene;
  }
  /**
   * 添加鼠标点击事件
   * @param cb 回调
   */
  addClickHandle(cb: (i: Intersection[]) => void) {
    const mouse = new Vector2();
    const raycaster = new Raycaster();
    let intersects: Intersection[];
    document.addEventListener(
      "click",
      e => {
        this.crtMouseHandle(mouse, e);
        raycaster.setFromCamera(mouse, this.camera);
        intersects = raycaster.intersectObjects(
          this.scene.children[0].children
        );
        this.modelHighlight(intersects[0]);
        cb && cb(intersects);
      },
      false
    );
  }

  /**
   * 鼠标向量归一化
   * @param mouse 鼠标向量
   * @param e 点击事件
   */
  crtMouseHandle(mouse: Vector2, e: MouseEvent) {
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  modelHighlight = (() => {
    let preMesh: Mesh | null; // 上一个几何体
    let preColor: number; // 上一个几何体颜色
    /**
     * 还原颜色
     * @param preMesh 上一个几何体
     */
    function restoreColor() {
      if (preMesh)
        // 还原上一个几何体颜色
        (preMesh.material as MeshLambertMaterial).emissive.setHex(preColor);
      preMesh = null;
    }

    return (intersect: Intersection) => {
      if (!intersect) return restoreColor();
      const mesh = intersect.object as Mesh;
      if (mesh.name !== "ground" && preMesh !== mesh) {
        // 不是同一个几何体
        restoreColor();
        preMesh = mesh;
        preColor = (preMesh.material as MeshLambertMaterial).emissive.getHex();
        (preMesh.material as MeshLambertMaterial).emissive.setHex(0xff0000);
      } else {
        restoreColor();
      }
    };
  })();
}
