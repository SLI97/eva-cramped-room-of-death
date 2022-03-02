import StateMachine from '../../../../../Base/StateMachine';
import { FSM_PARAM_TYPE_ENUM, PARAMS_NAME, ENTITY_TYPE_ENUM, SPIKES_TYPE_TOTAL_POINT } from '../../../../../Enum';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import SpikesOneSubStateMachine from './SpikesOneSubStateMachine';
import SpikesTwoSubStateMachine from './SpikesTwoSubStateMachine';
import SpikesThreeSubStateMachine from './SpikesThreeSubStateMachine';
import SpikesFourSubStateMachine from './SpikesFourSubStateMachine';
import SpikesManager from './SpikesManager';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class SpikesStateMachine extends StateMachine {
  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        autoPlay: true,
        forwards: true,
        resource: 'spikes_one_zero',
        speed: 1000 / 8,
      }),
    );

    this.initParams();
  }

  start() {
    this.states.set(ENTITY_TYPE_ENUM.SPIKES_ONE, new SpikesOneSubStateMachine(this.gameObject));
    this.states.set(ENTITY_TYPE_ENUM.SPIKES_TWO, new SpikesTwoSubStateMachine(this.gameObject));
    this.states.set(ENTITY_TYPE_ENUM.SPIKES_THREE, new SpikesThreeSubStateMachine(this.gameObject));
    this.states.set(ENTITY_TYPE_ENUM.SPIKES_FOUR, new SpikesFourSubStateMachine(this.gameObject));

    const value = this.params.get(PARAMS_NAME.SPIKES_TYPE).value;
    this.currentState = this.states.get(SPIKES_TYPE_TOTAL_POINT[value as number]);

    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    const sm = this.gameObject.getComponent(SpikesManager);
    spriteAnimation.on('complete', () => {
      //由于帧动画组件在不循环的情况下播放完会回到第一帧，所以手动停在最后一帧
      if (
        (value === SPIKES_TYPE_TOTAL_POINT.SPIKES_ONE && spriteAnimation.resource.startsWith('spikes_one_two')) ||
        (value === SPIKES_TYPE_TOTAL_POINT.SPIKES_TWO && spriteAnimation.resource.startsWith('spikes_two_three')) ||
        (value === SPIKES_TYPE_TOTAL_POINT.SPIKES_THREE && spriteAnimation.resource.startsWith('spikes_three_four')) ||
        (value === SPIKES_TYPE_TOTAL_POINT.SPIKES_FOUR && spriteAnimation.resource.startsWith('spikes_four_five'))
      ) {
        //例如尖刺1的value为2，攻击动画有四帧，所以value+1代表最后一帧
        sm.backZero();
      }
    });
  }

  initParams() {
    this.params.set(PARAMS_NAME.SPIKES_TYPE, {
      type: FSM_PARAM_TYPE_ENUM.NUMBER,
      value: 0,
    });

    this.params.set(PARAMS_NAME.CUR_POINT_COUNT, {
      type: FSM_PARAM_TYPE_ENUM.NUMBER,
      value: 1,
    });
  }

  update() {
    // const currentState = this.currentState;
    // switch (currentState) {
    //   case this.states.get(ENTITY_TYPE_ENUM.SPIKES_ONE):
    //     // if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 2) {
    //     // 	this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_ONE)
    //     // }else
    //     if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 3) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_TWO);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 4) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_THREE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 5) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_FOUR);
    //     }
    //     break;
    //   case this.states.get(ENTITY_TYPE_ENUM.SPIKES_TWO):
    //     if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 2) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_ONE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 4) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_THREE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 5) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_FOUR);
    //     }
    //     break;
    //   case this.states.get(ENTITY_TYPE_ENUM.SPIKES_THREE):
    //     if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 2) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_ONE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 3) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_TWO);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 5) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_FOUR);
    //     }
    //     break;
    //   case this.states.get(ENTITY_TYPE_ENUM.SPIKES_FOUR):
    //     if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 2) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_ONE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 3) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_TWO);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 4) {
    //       this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_THREE);
    //     }
    //     break;
    //   default:
    //     this.currentState = this.states.get(ENTITY_TYPE_ENUM.SPIKES_ONE);
    //     break;
    // }
    super.update();
  }
}
