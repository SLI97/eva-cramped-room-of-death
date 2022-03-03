import StateMachine, { getInitParamsTrigger } from '../../../../../Base/StateMachine';
import { ENTITY_STATE, PARAMS_NAME } from '../../../../../Enum';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import State, { ANIMATION_SPEED } from '../../../../../Base/State';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class BurstStateMachine extends StateMachine {
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
    this.params.set(PARAMS_NAME.ATTACK, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.DEATH, getInitParamsTrigger());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(ENTITY_STATE.IDLE, new State(spriteAnimation, 'burst_idle', 1));
    this.stateMachines.set(ENTITY_STATE.ATTACK, new State(spriteAnimation, 'burst_attack', 1));
    this.stateMachines.set(ENTITY_STATE.DEATH, new State(spriteAnimation, 'burst_death', 1));
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME.IDLE):
        if (this.params.get(PARAMS_NAME.ATTACK).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.ATTACK);
        } else if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.DEATH);
        } else {
          this.currentState = this.currentState;
        }
        break;
      case this.stateMachines.get(PARAMS_NAME.ATTACK):
        if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.DEATH);
        } else if (this.params.get(PARAMS_NAME.IDLE).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.IDLE);
        } else {
          this.currentState = this.currentState;
        }
        break;
      case this.stateMachines.get(PARAMS_NAME.DEATH):
        if (this.params.get(PARAMS_NAME.ATTACK).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.ATTACK);
        } else if (this.params.get(PARAMS_NAME.IDLE).value) {
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
