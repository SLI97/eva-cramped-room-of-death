import StateMachine, { getInitParamsNumber, getInitParamsTrigger } from '../../../../../Base/StateMachine';
import { ENTITY_STATE, PARAMS_NAME } from '../../../../../Enum';
import IdleSubStateMachine from './IdleSubStateMachine';
import DeathSubStateMachine from './DeathSubStateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import EntityManager from '../../../../../Base/EntityManager';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class SmokeStateMachine extends StateMachine {
  init() {
    const spriteAnimation = this.gameObject.addComponent(
      new SpriteAnimation({
        autoPlay: true,
        forwards: true,
        resource: 'smoke_idle_top',
        speed: 1000 / 12,
      }),
    );

    this.initParams();
    this.initStateMachines();

    spriteAnimation.on('complete', () => {
      console.log('smoke', 22);
      if (spriteAnimation.resource.startsWith('smoke_idle')) {
        const em = this.gameObject.getComponent(EntityManager);
        if (em) {
          em.state = ENTITY_STATE.DEATH;
        }
      }
    });
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

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME.IDLE):
      case this.stateMachines.get(PARAMS_NAME.DEATH):
        if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.DEATH);
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
