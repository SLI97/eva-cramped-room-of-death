import { Component } from '@eva/eva.js';
import { Render } from '@eva/plugin-renderer-render';
import DataManager from '../../../../Runtime/DataManager';

export default class FaderManager extends Component {
  static componentName = 'FaderManager'; // 设置组件的名字

  oldFrame: number = 0;
  duration: number = 100;
  isFadingIn: boolean = false;
  isFadingOut: boolean = false;

  fadeInPromise: Promise<null>;
  fadeOutPromise: Promise<null>;

  fadeInPromiseResolve: any;
  fadeOutPromiseResolve: any;

  render: Render;

  start() {
    this.render = this.gameObject.getComponent(Render);
  }

  update() {
    if (this.isFadingIn) {
      const fadePercent = (DataManager.Instance.frame - this.oldFrame) / ((60 * this.duration) / 1000);
      if (fadePercent < 1) {
        this.render.alpha = fadePercent;
      } else {
        this.render.alpha = 1;
        this.isFadingIn = false;
        this.fadeInPromiseResolve(null);
      }
    } else if (this.isFadingOut) {
      const fadePercent = (DataManager.Instance.frame - this.oldFrame) / ((60 * this.duration) / 1000);
      if (fadePercent < 1) {
        this.render.alpha = 1 - fadePercent;
      } else {
        this.isFadingOut = false;
        this.render.alpha = 0;
        this.fadeOutPromiseResolve();
      }
    }
  }

  fadeIn(duration = 100) {
    this.duration = duration;
    this.isFadingIn = true;
    this.isFadingOut = false;
    this.oldFrame = DataManager.Instance.frame;
    this.fadeInPromise = new Promise(resolve => {
      this.fadeInPromiseResolve = resolve;
    });
    return this.fadeInPromise;
  }

  fadeOut(duration = 100) {
    this.duration = duration;
    this.isFadingOut = true;
    this.isFadingIn = false;
    this.oldFrame = DataManager.Instance.frame;
    this.fadeOutPromise = new Promise(resolve => {
      this.fadeOutPromiseResolve = resolve;
    });
    return this.fadeOutPromise;
  }
}
