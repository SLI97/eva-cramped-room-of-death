import StateMachine from '../../../../../Base/StateMachine';
import { FSM_PARAM_TYPE_ENUM, PLAYER_STATE } from '../../../../../Enum/index';
import IdleSubStateMachine from './IdleSubStateMachine';
// import AttackSubStateMachine from './AttackSubStateMachine';
import TurnLeftSubStateMachine from './TurnLeftSubStateMachine';
import TurnRightSubStateMachine from './TurnRightSubStateMachine';
// import BlockFrontSubStateMachine from './BlockFrontSubStateMachine';
// import BlockBackSubStateMachine from './BlockBackSubStateMachine';
// import BlockLeftSubStateMachine from './BlockLeftSubStateMachine';
// import BlockRightSubStateMachine from './BlockRightSubStateMachine';
// import DeathSubStateMachine from './DeathSubStateMachine';
// import BlockTurnLeftSubStateMachine from './BlockTurnLeftSubStateMachine';
// import BlockTurnRightSubStateMachine from './BlockTurnRightSubStateMachine';
// import AirDeathSubStateMachine from './AirDeathSubStateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import PlayerManager from './PlayerManager';

export enum PARAMS_NAME {
  IDLE = 'IDLE',
  ATTACK = 'ATTACK',
  TURNLEFT = 'TURNLEFT',
  TURNRIGHT = 'TURNRIGHT',
  BLOCKFRONT = 'BLOCKFRONT',
  BLOCKBACK = 'BLOCKBACK',
  BLOCKLEFT = 'BLOCKLEFT',
  BLOCKRIGHT = 'BLOCKRIGHT',
  BLOCKTURNLEFT = 'BLOCKTURNLEFT',
  BLOCKTURNRIGHT = 'BLOCKTURNRIGHT',
  DEATH = 'DEATH',
  AIRDEATH = 'AIRDEATH',
  DIRECTION = 'DIRECTION',
}

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class PlayerStateMachine extends StateMachine {
  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        resource: 'player_idle_top',
        speed: 120,
        autoPlay: true,
      }),
    );

    this.initParams();
  }

  start() {
    this.states.set(PARAMS_NAME.IDLE, new IdleSubStateMachine(this.gameObject));
    // this.states.set(PARAMS_NAME.ATTACK, new AttackSubStateMachine(this.owner, this));
    this.states.set(PARAMS_NAME.TURNLEFT, new TurnLeftSubStateMachine(this.gameObject));
    this.states.set(PARAMS_NAME.TURNRIGHT, new TurnRightSubStateMachine(this.gameObject));
    // this.states.set(PARAMS_NAME.BLOCKFRONT, new BlockFrontSubStateMachine(this.owner, this));
    // this.states.set(PARAMS_NAME.BLOCKBACK, new BlockBackSubStateMachine(this.owner, this));
    // this.states.set(PARAMS_NAME.BLOCKLEFT, new BlockLeftSubStateMachine(this.owner, this));
    // this.states.set(PARAMS_NAME.BLOCKRIGHT, new BlockRightSubStateMachine(this.owner, this));
    // this.states.set(PARAMS_NAME.BLOCKTURNLEFT, new BlockTurnLeftSubStateMachine(this.owner, this));
    // this.states.set(PARAMS_NAME.BLOCKTURNRIGHT, new BlockTurnRightSubStateMachine(this.owner, this));
    // this.states.set(PARAMS_NAME.DEATH, new DeathSubStateMachine(this.owner, this));
    // this.states.set(PARAMS_NAME.AIRDEATH, new AirDeathSubStateMachine(this.owner, this));
    this.currentState = this.states.get(PARAMS_NAME.IDLE);

    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      //由于帧动画组件在不循环的情况下播放完会回到第一帧，所以手动停在最后一帧
      if (spriteAnimation.resource.startsWith('player_turn')) {
        spriteAnimation.gotoAndStop(2);
        this.gameObject.getComponent(PlayerManager).state = PLAYER_STATE.IDLE;
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

    this.params.set(PARAMS_NAME.TURNLEFT, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.TURNRIGHT, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.BLOCKFRONT, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.BLOCKBACK, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.BLOCKLEFT, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.BLOCKRIGHT, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.BLOCKTURNLEFT, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.BLOCKTURNRIGHT, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.DEATH, {
      type: FSM_PARAM_TYPE_ENUM.TRIGGER,
      value: false,
    });

    this.params.set(PARAMS_NAME.AIRDEATH, {
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
      case this.states.get(PARAMS_NAME.IDLE):
      case this.states.get(PARAMS_NAME.ATTACK):
      case this.states.get(PARAMS_NAME.TURNLEFT):
      case this.states.get(PARAMS_NAME.TURNRIGHT):
      case this.states.get(PARAMS_NAME.BLOCKTURNLEFT):
      case this.states.get(PARAMS_NAME.BLOCKTURNRIGHT):
      case this.states.get(PARAMS_NAME.BLOCKFRONT):
      case this.states.get(PARAMS_NAME.BLOCKBACK):
      case this.states.get(PARAMS_NAME.BLOCKLEFT):
      case this.states.get(PARAMS_NAME.BLOCKRIGHT):
      case this.states.get(PARAMS_NAME.DEATH):
      case this.states.get(PARAMS_NAME.AIRDEATH):
        if (this.params.get(PARAMS_NAME.DEATH).value) {
          this.currentState = this.states.get(PARAMS_NAME.DEATH);
        } else if (this.params.get(PARAMS_NAME.AIRDEATH).value) {
          this.currentState = this.states.get(PARAMS_NAME.AIRDEATH);
        } else if (this.params.get(PARAMS_NAME.TURNLEFT).value) {
          this.currentState = this.states.get(PARAMS_NAME.TURNLEFT);
        } else if (this.params.get(PARAMS_NAME.TURNRIGHT).value) {
          this.currentState = this.states.get(PARAMS_NAME.TURNRIGHT);
        } else if (this.params.get(PARAMS_NAME.IDLE).value) {
          this.currentState = this.states.get(PARAMS_NAME.IDLE);
        } else if (this.params.get(PARAMS_NAME.BLOCKFRONT).value) {
          this.currentState = this.states.get(PARAMS_NAME.BLOCKFRONT);
        } else if (this.params.get(PARAMS_NAME.BLOCKBACK).value) {
          this.currentState = this.states.get(PARAMS_NAME.BLOCKBACK);
        } else if (this.params.get(PARAMS_NAME.BLOCKLEFT).value) {
          this.currentState = this.states.get(PARAMS_NAME.BLOCKLEFT);
        } else if (this.params.get(PARAMS_NAME.BLOCKRIGHT).value) {
          this.currentState = this.states.get(PARAMS_NAME.BLOCKRIGHT);
        } else if (this.params.get(PARAMS_NAME.BLOCKTURNLEFT).value) {
          this.currentState = this.states.get(PARAMS_NAME.BLOCKTURNLEFT);
        } else if (this.params.get(PARAMS_NAME.BLOCKTURNRIGHT).value) {
          this.currentState = this.states.get(PARAMS_NAME.BLOCKTURNRIGHT);
        } else if (this.params.get(PARAMS_NAME.ATTACK).value) {
          this.currentState = this.states.get(PARAMS_NAME.ATTACK);
        }
        break;
      default:
        this.currentState = this.states.get(PARAMS_NAME.IDLE);
        break;
    }
    super.update();
  }
}
