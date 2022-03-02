import StateMachine from '../../../../../Base/StateMachine';
import { FSM_PARAM_TYPE_ENUM, PLAYER_STATE, PARAMS_NAME } from '../../../../../Enum';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import State from '../../../../../Base/State';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class BurstStateMachine extends StateMachine {
  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        autoPlay: true,
        forwards: true,
        resource: 'burst_idle',
        speed: 1000 / 8,
      }),
    );

    this.initParams();
  }

  start() {
    this.states.set(PLAYER_STATE.IDLE, new State(this.gameObject, 'burst_idle', 1));
    this.states.set(PLAYER_STATE.ATTACK, new State(this.gameObject, 'burst_attack', 1));
    this.states.set(PLAYER_STATE.DEATH, new State(this.gameObject, 'burst_death', 1));
    this.currentState = this.states.get(PLAYER_STATE.IDLE);
  }

  initParams() {
    this.params.set(PARAMS_NAME.IDLE, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.ATTACK, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.DEATH, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });
  }

  update() {
    const currentState = this.currentState;
    switch (currentState) {
      case this.states.get(PLAYER_STATE.IDLE):
        if (this.params.get(PARAMS_NAME.ATTACK).value) {
          this.currentState = this.states.get(PLAYER_STATE.ATTACK);
        } else if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.states.get(PLAYER_STATE.DEATH);
        }
        break;
      case this.states.get(PLAYER_STATE.ATTACK):
        if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.states.get(PLAYER_STATE.DEATH);
        } else if (this.params.get(PARAMS_NAME.IDLE).value) {
          this.currentState = this.states.get(PLAYER_STATE.IDLE);
        }
        break;
      case this.states.get(PLAYER_STATE.DEATH):
        if (this.params.get(PARAMS_NAME.ATTACK).value) {
          this.currentState = this.states.get(PLAYER_STATE.ATTACK);
        } else if (this.params.get(PARAMS_NAME.IDLE).value) {
          this.currentState = this.states.get(PLAYER_STATE.IDLE);
        }
        break;
      default:
        this.currentState = this.states.get(PLAYER_STATE.IDLE);
        break;
    }

    super.update();
  }
}
