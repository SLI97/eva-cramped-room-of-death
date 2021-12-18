import StateMachine from '../../../../../Base/StateMachine';
import { FSM_PARAM_TYPE_ENUM, PLAYER_STATE, PARAMS_NAME } from '../../../../../Enum';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { Render } from '@eva/plugin-renderer-render';
import IdleState from './IdleState';
import AttackState from './AttackState';
import DeathState from './DeathState';

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
    this.gameObject.addComponent(
      new Render(
        new Render({
          zIndex: 0,
        }),
      ),
    );

    this.initParams();
  }

  start() {
    this.states.set(PLAYER_STATE.IDLE, new IdleState(this.gameObject, 'burst_idle', 1));
    this.states.set(PLAYER_STATE.ATTACK, new AttackState(this.gameObject, 'burst_attack', 1));
    this.states.set(PLAYER_STATE.DEATH, new DeathState(this.gameObject, 'burst_death', 1));
    this.currentState = this.states.get(PLAYER_STATE.IDLE);

    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      //由于帧动画组件在不循环的情况下播放完会回到第一帧，所以手动停在最后一帧
      if (spriteAnimation.resource.startsWith('burst_death')) {
      }
    });
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
        if (this.params.get(PARAMS_NAME.IDLE).value) {
          this.currentState = this.states.get(PLAYER_STATE.IDLE);
        } else if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.states.get(PLAYER_STATE.DEATH);
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
