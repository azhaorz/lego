import { Camera, CameraType } from "./Camera";
import { Scene, SceneType } from "./Scene";
import { Light, LightType } from "./Light";
import { RendererFactory, RendererType } from "./Renderer";
import { ControlFactory, ControlType } from "./Control";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

import { WEBGL } from "../utils/WebGl.js";
import {
  Scene as tScene,
  Camera as tCamera,
  Light as tLight,
  Renderer,
  ExtrudeGeometry,
  MeshStandardMaterial,
  Mesh,
  Shape,
  Color
} from "three";

import { CameraOptions } from "../config/camera";
import { SceneOptions } from "../config/scene";
import Stats from "stats.js";
import Helper from "../utils/Helper";
import Model from "./Model";
import Interaction from "./Interaction";
import { AmbientOptions, DirectionalOptions } from "../config/light";

export default class Lego {
  el: HTMLElement;
  // 场景
  scene: tScene;

  // 相机
  camera: tCamera;

  // 渲染器
  renderer: Renderer;

  // 控制器
  control: MapControls;

  // 场地
  ground: Mesh | null = null;

  // 环境光
  ambientLight: tLight;

  // 平行光
  directionalLight: tLight;

  // 调试函数组
  debugList: Function[] = [];

  constructor({
    el,
    camera: cameraOptions,
    scene: sceneOptions,
    ambient: ambientOptions,
    directional: directionalOptions
  }: LegoOptions) {
    if (!el || el.toString() !== "[object HTMLDivElement]") {
      throw new Error("请传入需要被挂载的document节点元素");
    }

    if (!this.compatibilityCheck(el)) throw new Error("此浏览器不支持webgl");

    // 挂载元素
    this.el = el;
    // 场景
    this.scene = new Scene().crtScene(SceneType.Scene, sceneOptions);
    this.scene.add(Model.group);
    // 相机
    this.camera = new Camera(el, this).crtCamera(
      CameraType.Orthographic,
      cameraOptions
    );
    // 光照
    const lf = new Light(this);
    this.scene.add(
      (this.ambientLight = lf.crtLight(LightType.Ambient, ambientOptions))
    );
    this.scene.add(
      (this.directionalLight = lf.crtLight(
        LightType.Directional,
        directionalOptions
      ))
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

  render() {
    const { control, scene, renderer, camera } = this;
    console.log(this.debugList);

    const animate = () => {
      this.debugList.forEach(f => f());
      control.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }

  debug() {
    const { control, scene, renderer, camera } = this;
    const helper = new Helper(this.scene);
    helper.crtGrid(50);
    const stats = new Stats();
    stats.showPanel(0);
    this.el.appendChild(stats.dom);
    new Interaction(camera, scene).addClickHandle(i => console.log(i));

    const animate = () => {
      renderer.render(scene, camera);
      control.update();
      stats.update();
      requestAnimationFrame(animate);
    };
    animate();
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
  /**
   * 环境光配置
   */
  ambient?: AmbientOptions;
  /**
   * 平行光配置
   */
  directional?: DirectionalOptions;
}
