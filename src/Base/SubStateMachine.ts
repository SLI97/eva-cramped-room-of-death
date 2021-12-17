import State from './State';
import { GameObject } from '@eva/eva.js';
import StateMachine, { IParamsValue } from './StateMachine';
import EntityManager from './EntityManager';

/***
 * 子有限状态机基类
 * 用处：例如有个idle的state，但是有多个方向，为了让主状态机更整洁，可以把同类型的但具体不同的state都封装在子状态机种
 */
export default class SubStateMachine {
  public go: GameObject = null;
  _currentState: State | SubStateMachine = null;
  params: Map<string, IParamsValue> = new Map();
  states: Map<string, State | SubStateMachine> = new Map();
  manager: EntityManager;

  constructor(go: GameObject) {
    this.go = go;
    this.manager = this.go.getComponent(EntityManager);
    this.params = this.go.getComponent(StateMachine).params;
  }

  get currentState() {
    return this._currentState;
  }

  set currentState(value) {
    if (value === this._currentState) {
      return;
    }
    this._currentState = value;
    if (this._currentState instanceof State) {
      this._currentState.play();
    }
  }

  stop() {
    this.currentState = null;
    for (const [_, value] of this.states) {
      if (value instanceof State) {
        value.stop();
      }
    }
  }

  /***
   * 子状态机的update由主状态机驱动
   */
  update() {}
}
