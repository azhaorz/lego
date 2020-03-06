import { Renderer, WebGLRenderer } from "three";

export enum RendererType {
  WebGLRenderer = "WebGLRenderer"
}

export class RendererFactory {
  /**
   * 挂载元素
   */
  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
  }
  /**
   * 获取渲染器
   * @param type 渲染器类型
   */
  getRenderer(type: RendererType): Renderer {
    let renderer: Renderer;
    if (type === RendererType.WebGLRenderer) {
      renderer = new WebGLRenderer({ antialias: true });
    } else {
      throw new Error("请传入正确的渲染器类型");
    }
    const { offsetWidth, offsetHeight } = this.el;
    renderer.setSize(offsetWidth, offsetHeight, false);
    this.el.appendChild(renderer.domElement);
    return renderer;
  }
}
