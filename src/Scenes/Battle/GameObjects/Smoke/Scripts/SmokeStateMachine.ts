import StateMachine from '../../../../../Base/StateMachine';
import { FSM_PARAM_TYPE_ENUM, PLAYER_STATE, PARAMS_NAME } from '../../../../../Enum';
import IdleSubStateMachine from './IdleSubStateMachine';
import DeathSubStateMachine from './DeathSubStateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import EnemyManager from '../../../../../Base/EnemyManager';
import { Render } from '@eva/plugin-renderer-render';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class SmokeStateMachine extends StateMachine {
  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        autoPlay: true,
        forwards: true,
        resource: 'smoke_idle_top',
        speed: 1000 / 12,
      }),
    );

    this.gameObject.addComponent(new Render());

    this.initParams();
  }

  start() {
    this.states.set(PARAMS_NAME.IDLE, new IdleSubStateMachine(this.gameObject));
    this.states.set(PARAMS_NAME.DEATH, new DeathSubStateMachine(this.gameObject));
    this.currentState = this.states.get(PLAYER_STATE.IDLE);

    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      //由于帧动画组件在不循环的情况下播放完会回到第一帧，所以手动停在最后一帧
      if (spriteAnimation.resource.startsWith('smoke_idle')) {
        this.gameObject.getComponent(EnemyManager).state = PLAYER_STATE.DEATH;
      }
    });
  }

  initParams() {
    this.params.set(PARAMS_NAME.IDLE, {
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

  update() {
    const currentState = this.currentState;
    switch (currentState) {
      case this.states.get(PLAYER_STATE.IDLE):
        if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.states.get(PARAMS_NAME.DEATH);
        }
        break;
      case this.states.get(PLAYER_STATE.DEATH):
        if (this.params.get(PARAMS_NAME.IDLE).value) {
          this.currentState = this.states.get(PARAMS_NAME.IDLE);
        }
        break;
      default:
        this.currentState = this.states.get(PLAYER_STATE.IDLE);
        break;
    }

    super.update();
  }
}
