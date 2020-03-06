import { CameraFactory, CameraType, Camera } from "./core/Camera";
import { SceneFactory, SceneType } from "./core/Scene";
import { LightFactory, LightType, Light } from "./core/Light";
import { RendererFactory, RendererType } from "./core/Renderer";
import { ControlFactory, ControlType } from "./core/Control";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

import { WEBGL } from "./utils/WebGl.js";
import Dat from "./utils/Dat";
import {
  Scene,
  Renderer,
  ExtrudeGeometry,
  MeshStandardMaterial,
  Mesh,
  Shape,
  Color,
  BoxGeometry
} from "three";

import { CameraOptions } from "./config/camera";
import { SceneOptions } from "./config/scene";
import Stats from "stats.js";

export default class Lego {
  el: HTMLElement;
  // 场景
  scene: Scene;

  // 相机
  camera: Camera;

  // 渲染器
  renderer: Renderer;

  // 控制器
  control: MapControls;

  // 场地
  ground: Mesh | null = null;

  // 环境光
  ambientLight: Light;

  // 平行光
  directionalLight: Light;

  constructor({ el, camera: cameraOptions, scene: sceneOptions }: LegoOptions) {
    if (!el || el.toString() !== "[object HTMLDivElement]") {
      throw new Error("请传入需要被挂载的document节点元素");
    }

    if (!this.compatibilityCheck(el)) throw new Error("此浏览器不支持webgl");

    // 挂载元素
    this.el = el;
    // 场景
    this.scene = new SceneFactory().getScene(SceneType.Scene, sceneOptions);
    // 相机
    this.camera = new CameraFactory(el).getCamera(
      CameraType.Orthographic,
      cameraOptions
    );
    // 光照
    const lf = new LightFactory();
    this.scene.add((this.ambientLight = lf.getLight(LightType.Ambient)));
    this.scene.add(
      (this.directionalLight = lf.getLight(LightType.Directional))
    );
    // 渲染器
    this.renderer = new RendererFactory(el).getRenderer(
      RendererType.WebGLRenderer
    );
    // 控制器
    this.control = new ControlFactory(el, this.camera).getControl(
      ControlType.MapControls
    );
  }

  /**
   * 兼容性检测
   * @param el 挂载节点
   */
  compatibilityCheck(el: HTMLElement): boolean {
    if (WEBGL.isWebGLAvailable()) {
      return true;
    } else {
      const warning = WEBGL.getWebGLErrorMessage();
      el.appendChild(warning);
      return false;
    }
  }

  /**
   * 创建场地
   */
  createGround() {
    const groundShape = new Shape();
    const extrudeSettings = {
      steps: 2,
      depth: 10,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1
    };

    groundShape.moveTo(-250, -200);
    groundShape.lineTo(-250, 200);
    groundShape.lineTo(250, 200);
    groundShape.lineTo(250, -200);
    const geometry = new ExtrudeGeometry(groundShape, extrudeSettings);
    const material = new MeshStandardMaterial({ color: new Color("#efefef") });
    this.ground = new Mesh(geometry, material);
    this.scene.add(this.ground);
  }

  createRectangle({ width, height, x, y, z }: Rectangle) {
    const rectangle = new BoxGeometry(width, 10, height);
    const material = new MeshStandardMaterial({ color: new Color("#00ff00") });
    const mesh = new Mesh(rectangle, material);
    mesh.position.set(x, y, z);
    this.scene.add(mesh);
  }

  render() {
    const { control, scene, renderer, camera } = this;
    control.update();
    function animate() {
      requestAnimationFrame(animate);
      control.update();
      renderer.render(scene, camera);
    }
    animate();
  }

  debug() {
    const { control, scene, renderer, camera } = this;
    const gui = new Dat();

    const l = gui.light({ x: 40, y: 300, z: 300 });
    const g = gui.ground({ rx: Math.PI / 2, ry: 0, rz: 0 });
    const stats = new Stats();
    stats.showPanel(0);
    this.el.appendChild(stats.dom);

    const animate = () => {
      this.camera.debug();
      this.ambientLight.debug();
      this.directionalLight.position.set(l.x, l.y, l.z);
      this.ground && this.ground.rotation.set(g.rx, g.ry, g.rz);
      control.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      stats.update();
    };
    animate();
    control.update();
  }
}

// 构造函数配置项
interface LegoOptions {
  /**
   * 挂载元素
   */
  el: HTMLElement | null;
  /**
   * 相机配置
   */
  camera?: CameraOptions;
  /**
   * 场景配置
   */
  scene?: SceneOptions;
}

interface Rectangle {
  /**
   * 矩形宽度
   */
  width: number;
  /**
   * 矩形高度
   */
  height: number;
  /**
   * 矩形x轴位置
   */
  x: number;
  /**
   * 矩形y轴位置
   */
  y: number;
  /**
   * 矩形z轴位置
   */
  z: number;
}
