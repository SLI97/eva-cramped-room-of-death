import StateMachine, { getInitParamsNumber, getInitParamsTrigger } from '../../../../../Base/StateMachine';
import { ENTITY_STATE, PARAMS_NAME, EVENT_ENUM, SHAKE_ENUM } from '../../../../../Enum';
import IdleSubStateMachine from './IdleSubStateMachine';
import AttackSubStateMachine from './AttackSubStateMachine';
import TurnLeftSubStateMachine from './TurnLeftSubStateMachine';
import TurnRightSubStateMachine from './TurnRightSubStateMachine';
import BlockFrontSubStateMachine from './BlockFrontSubStateMachine';
import BlockBackSubStateMachine from './BlockBackSubStateMachine';
import BlockLeftSubStateMachine from './BlockLeftSubStateMachine';
import BlockRightSubStateMachine from './BlockRightSubStateMachine';
import BlockTurnLeftSubStateMachine from './BlockTurnLeftSubStateMachine';
import BlockTurnRightSubStateMachine from './BlockTurnRightSubStateMachine';
import DeathSubStateMachine from './DeathSubStateMachine';
import AirDeathSubStateMachine from './AirDeathSubStateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { Render } from '@eva/plugin-renderer-render';
import EventManager from '../../../../../Runtime/EventManager';
import EntityManager from '../../../../../Base/EntityManager';
import { ANIMATION_SPEED } from '../../../../../Base/State';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class PlayerStateMachine extends StateMachine {
  init() {
    const spriteAnimation = this.gameObject.addComponent(
      new SpriteAnimation({
        autoPlay: true,
        forwards: true,
        resource: '',
        speed: ANIMATION_SPEED,
      }),
    );

    this.gameObject.addComponent(
      new Render({
        zIndex: 1,
      }),
    );

    this.initParams();
    this.initStateMachines();

    spriteAnimation.on('complete', () => {
      if (!this.gameObject || !this.gameObject.getComponent(EntityManager)) {
        return;
      }
      const list = ['player_turn', 'player_block', 'player_attack'];
      if (list.some(item => spriteAnimation.resource.startsWith(item))) {
        this.gameObject.getComponent(EntityManager).state = ENTITY_STATE.IDLE;
      }
    });

    spriteAnimation.on('frameChange', () => {
      //攻击动画第五帧的时候震动屏幕
      if (spriteAnimation.resource.startsWith('player_attack') && spriteAnimation.currentFrame === 4) {
        switch (spriteAnimation.resource) {
          case 'player_attack_top':
            EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, SHAKE_ENUM.TOP);
            break;
          case 'player_attack_bottom':
            EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, SHAKE_ENUM.BOTTOM);
            break;
          case 'player_attack_left':
            EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, SHAKE_ENUM.LEFT);
            break;
          case 'player_attack_right':
            EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, SHAKE_ENUM.RIGHT);
            break;
          default:
            break;
        }
      }
    });
  }

  initParams() {
    this.params.set(PARAMS_NAME.IDLE, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.ATTACK, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.TURNLEFT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.TURNRIGHT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.BLOCKFRONT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.BLOCKBACK, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.BLOCKLEFT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.BLOCKRIGHT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.BLOCKTURNLEFT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.BLOCKTURNRIGHT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.DEATH, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.AIRDEATH, getInitParamsTrigger());
    this.params.set(PARAMS_NAME.DIRECTION, getInitParamsNumber());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(PARAMS_NAME.IDLE, new IdleSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.ATTACK, new AttackSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.TURNLEFT, new TurnLeftSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.TURNRIGHT, new TurnRightSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.BLOCKFRONT, new BlockFrontSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.BLOCKBACK, new BlockBackSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.BLOCKLEFT, new BlockLeftSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.BLOCKRIGHT, new BlockRightSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.BLOCKTURNLEFT, new BlockTurnLeftSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.BLOCKTURNRIGHT, new BlockTurnRightSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.DEATH, new DeathSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME.AIRDEATH, new AirDeathSubStateMachine(this, spriteAnimation));
  }

  /***
   * 根据当前所在状态（currentState）和参数（params）决定怎么切换状态机
   */
  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME.IDLE):
      case this.stateMachines.get(PARAMS_NAME.ATTACK):
      case this.stateMachines.get(PARAMS_NAME.TURNLEFT):
      case this.stateMachines.get(PARAMS_NAME.TURNRIGHT):
      case this.stateMachines.get(PARAMS_NAME.BLOCKTURNLEFT):
      case this.stateMachines.get(PARAMS_NAME.BLOCKTURNRIGHT):
      case this.stateMachines.get(PARAMS_NAME.BLOCKFRONT):
      case this.stateMachines.get(PARAMS_NAME.BLOCKBACK):
      case this.stateMachines.get(PARAMS_NAME.BLOCKLEFT):
      case this.stateMachines.get(PARAMS_NAME.BLOCKRIGHT):
      case this.stateMachines.get(PARAMS_NAME.DEATH):
      case this.stateMachines.get(PARAMS_NAME.AIRDEATH):
        if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.DEATH);
        } else if (this.params.get(PARAMS_NAME.AIRDEATH).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.AIRDEATH);
        } else if (this.params.get(PARAMS_NAME.TURNLEFT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.TURNLEFT);
        } else if (this.params.get(PARAMS_NAME.TURNRIGHT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.TURNRIGHT);
        } else if (this.params.get(PARAMS_NAME.BLOCKFRONT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.BLOCKFRONT);
        } else if (this.params.get(PARAMS_NAME.BLOCKBACK).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.BLOCKBACK);
        } else if (this.params.get(PARAMS_NAME.BLOCKLEFT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.BLOCKLEFT);
        } else if (this.params.get(PARAMS_NAME.BLOCKRIGHT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.BLOCKRIGHT);
        } else if (this.params.get(PARAMS_NAME.BLOCKTURNLEFT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.BLOCKTURNLEFT);
        } else if (this.params.get(PARAMS_NAME.BLOCKTURNRIGHT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME.BLOCKTURNRIGHT);
        } else if (this.params.get(PARAMS_NAME.ATTACK).value) {
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
