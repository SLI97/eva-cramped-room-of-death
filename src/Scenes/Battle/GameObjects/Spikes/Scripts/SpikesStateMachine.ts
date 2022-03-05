import StateMachine, { getInitParamsNumber } from '../../../../../Base/StateMachine';
import { PARAMS_NAME_ENUM, ENTITY_TYPE_ENUM, SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM } from '../../../../../Enum';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import SpikesOneSubStateMachine from './SpikesOneSubStateMachine';
import SpikesTwoSubStateMachine from './SpikesTwoSubStateMachine';
import SpikesThreeSubStateMachine from './SpikesThreeSubStateMachine';
import SpikesFourSubStateMachine from './SpikesFourSubStateMachine';
import SpikesManager from './SpikesManager';
import { ANIMATION_SPEED } from '../../../../../Base/State';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class SpikesStateMachine extends StateMachine {
  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        autoPlay: false,
        forwards: true,
        resource: '',
        speed: ANIMATION_SPEED,
      }),
    );

    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initAnimationEvent() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      if (!this.gameObject || !this.gameObject.getComponent(SpikesManager)) {
        return;
      }
      const { value } = this.params.get(PARAMS_NAME_ENUM.SPIKES_TOTAL_COUNT);
      //例如1个刺的地裂，在播放完1刺之后，回到0的状态
      if (
        (value === SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM.SPIKES_ONE &&
          spriteAnimation.resource.startsWith('spikes_one_two')) ||
        (value === SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM.SPIKES_TWO &&
          spriteAnimation.resource.startsWith('spikes_two_three')) ||
        (value === SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM.SPIKES_THREE &&
          spriteAnimation.resource.startsWith('spikes_three_four')) ||
        (value === SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM.SPIKES_FOUR &&
          spriteAnimation.resource.startsWith('spikes_four_five'))
      ) {
        this.gameObject.getComponent(SpikesManager).backZero();
      }
    });
  }

  initParams() {
    this.params.set(PARAMS_NAME_ENUM.SPIKES_TOTAL_COUNT, getInitParamsNumber());
    this.params.set(PARAMS_NAME_ENUM.SPIKES_CUR_COUNT, getInitParamsNumber());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(ENTITY_TYPE_ENUM.SPIKES_ONE, new SpikesOneSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(ENTITY_TYPE_ENUM.SPIKES_TWO, new SpikesTwoSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(ENTITY_TYPE_ENUM.SPIKES_THREE, new SpikesThreeSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(ENTITY_TYPE_ENUM.SPIKES_FOUR, new SpikesFourSubStateMachine(this, spriteAnimation));
  }

  run() {
    const { value } = this.params.get(PARAMS_NAME_ENUM.SPIKES_TOTAL_COUNT);
    switch (this.currentState) {
      case this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_ONE):
      case this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_TWO):
      case this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_THREE):
      case this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_FOUR):
        if (value === SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM.SPIKES_ONE) {
          this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_ONE);
        } else if (value === SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM.SPIKES_TWO) {
          this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_TWO);
        } else if (value === SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM.SPIKES_THREE) {
          this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_THREE);
        } else if (value === SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM.SPIKES_FOUR) {
          this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_FOUR);
        } else {
          this.currentState = this.currentState;
        }
        break;
      default:
        this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_ONE);
        break;
    }
  }
}
