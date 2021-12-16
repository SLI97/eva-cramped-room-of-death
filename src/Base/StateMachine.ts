import { FSM_PARAM_TYPE_ENUM } from '../Enum';
import { Component } from '@eva/eva.js';

import State from './State';
import SubStateMachine from './SubStateMachine';

export interface IParamsValue {
  type: FSM_PARAM_TYPE_ENUM;
  value: boolean | number;
}

/***
 * 有限状态机基类
 */
export default class StateMachine extends Component {
  static componentName = 'StateMachine'; // 设置组件的名字

  _currentState: State | SubStateMachine = null;
  params: Map<string, IParamsValue> = new Map();
  states: Map<string, SubStateMachine | State> = new Map();

  get currentState() {
    return this._currentState;
  }

  set currentState(value) {
    this.stop();
    this._currentState = value;
    if (this._currentState instanceof State) {
      this._currentState.play();
    }
  }

  stop() {
    for (const [_, value] of this.states) {
      value.stop();
    }
  }

  /***
   * 子状态机的update由主状态机驱动
   */
  update() {
    if (this.currentState instanceof SubStateMachine) {
      this.currentState.update();
    }
    this.resetTrigger();
  }

  getParams(paramsName: string) {
    if (this.params.has(paramsName)) {
      return this.params.get(paramsName).value;
    }
  }

  setParams(paramsName: string, value: boolean | number) {
    if (this.params.has(paramsName)) {
      this.params.get(paramsName).value = value;
    }
  }

  resetTrigger() {
    for (const [_, value] of this.params) {
      if (value.type === FSM_PARAM_TYPE_ENUM.TRIGGER) {
        value.value = false;
      }
    }
  }
}
