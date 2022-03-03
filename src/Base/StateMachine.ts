import { FSM_PARAM_TYPE_ENUM } from '../Enum';
import { Component } from '@eva/eva.js';

import State from './State';
import SubStateMachine from './SubStateMachine';

export interface IParamsValue {
  type: FSM_PARAM_TYPE_ENUM;
  value: boolean | number;
}

export const getInitParamsTrigger = () => {
  return {
    type: FSM_PARAM_TYPE_ENUM.TRIGGER,
    value: false,
  };
};

export const getInitParamsNumber = () => {
  return {
    type: FSM_PARAM_TYPE_ENUM.NUMBER,
    value: 0,
  };
};

/***
 * 流动图
 * 1.entity的state或者direction改变触发setter
 * 2.setter里触发fsm的setParams方法
 * 3.setParams执行run方法
 * 4.run方法由子类重写，run方法会更改currentState，然后触发currentState的setter
 * 5-1.如果currentState是子状态机，继续执行他的run方法
 * 5-2.如果是子状态，直接播放动画
 */

/***
 * 有限状态机基类
 */
export default abstract class StateMachine extends Component {
  static componentName = 'StateMachine'; // 设置组件的名字

  _currentState: State | SubStateMachine = null;
  params: Map<string, IParamsValue> = new Map();
  stateMachines: Map<string, SubStateMachine | State> = new Map();

  getParams(paramsName: string) {
    if (this.params.has(paramsName)) {
      return this.params.get(paramsName).value;
    }
  }

  setParams(paramsName: string, value: boolean | number) {
    if (this.params.has(paramsName)) {
      this.params.get(paramsName).value = value;
      this.run();
      this.resetTrigger();
    }
  }

  get currentState() {
    return this._currentState;
  }

  set currentState(newState) {
    this._currentState = newState;
    this._currentState.run();
  }

  /***
   * 由子类重写，方法目标是根据当前状态和参数修改currentState
   */
  run() {}

  resetTrigger() {
    for (const [_, value] of this.params) {
      if (value.type === FSM_PARAM_TYPE_ENUM.TRIGGER) {
        value.value = false;
      }
    }
  }
}
