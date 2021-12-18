import StateMachine from '../../../../../Base/StateMachine';
import { FSM_PARAM_TYPE_ENUM, PLAYER_STATE, PARAMS_NAME } from '../../../../../Enum';
import IdleSubStateMachine from './IdleSubStateMachine';
import AttackSubStateMachine from './AttackSubStateMachine';
import DeathSubStateMachine from './DeathSubStateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import EnemyManager from '../../../../../Base/EnemyManager';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class WoodenSkeletonStateMachine extends StateMachine {
  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        autoPlay: true,
        forwards: true,
        resource: 'woodenskeleton_idle_top',
        speed: 1000 / 8,
      }),
    );

    this.initParams();
  }

  start() {
    this.states.set(PARAMS_NAME.IDLE, new IdleSubStateMachine(this.gameObject));
    this.states.set(PARAMS_NAME.ATTACK, new AttackSubStateMachine(this.gameObject));
    this.states.set(PARAMS_NAME.DEATH, new DeathSubStateMachine(this.gameObject));
    this.currentState = this.states.get(PARAMS_NAME.IDLE);

    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      //由于帧动画组件在不循环的情况下播放完会回到第一帧，所以手动停在最后一帧
      if (spriteAnimation.resource.startsWith('woodenskeleton_attack')) {
        this.gameObject.getComponent(EnemyManager).state = PLAYER_STATE.IDLE;
      } else if (spriteAnimation.resource.startsWith('woodenskeleton_death')) {
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

    this.params.set(PARAMS_NAME.DIRECTION, {
      type: FSM_PARAM_TYPE_ENUM.NUMBER,
      value: 0,
    });
  }

  /***
   * 根据当前所在状态（currentState）和参数（params）决定怎么切换状态机
   */
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
