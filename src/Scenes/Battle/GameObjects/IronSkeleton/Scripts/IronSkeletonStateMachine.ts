import StateMachine, { getInitParamsNumber, getInitParamsTrigger } from '../../../../../Base/StateMachine';
import { PARAMS_NAME } from '../../../../../Enum';
import IdleSubStateMachine from './IdleSubStateMachine';
import DeathSubStateMachine from './DeathSubStateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { ANIMATION_SPEED } from '../../../../../Base/State';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class IronSkeletonStateMachine extends StateMachine {
  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        autoPlay: true,
        forwards: true,
        resource: '',
        speed: ANIMATION_SPEED,
      }),
    );

    this.initParams();
    this.initStateMachines();
  }

  initParams() {
    this.params.set(PARAMS_NAME.IDLE, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.DEATH, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.DIRECTION, getInitParamsNumber());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(PARAMS_NAME.IDLE, new IdleSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.DEATH, new DeathSubStateMachine(this, spriteAnimation));
  }

  /***
   * 根据当前所在状态（currentState）和参数（params）决定怎么切换状态机
   */

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME.IDLE):
        if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.DEATH);
        } else {
          this.currentState = this.currentState;
        }
        break;
      case this.stateMachines.get(PARAMS_NAME.DEATH):
        if (this.params.get(PARAMS_NAME.IDLE).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.IDLE);
        } else {
          this.currentState = this.currentState;
        }
        break;
      default:
        this.currentState = this.stateMachines.get(PARAMS_NAME.IDLE);
        break;
    }
  }
}
