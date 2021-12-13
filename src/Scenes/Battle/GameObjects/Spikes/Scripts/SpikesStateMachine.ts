import StateMachine from '../../../../../Base/StateMachine';
import {
  FSM_PARAM_TYPE_ENUM,
  PARAMS_NAME,
  ENEMY_TYPE_ENUM,
  SPIKES_TYPE_TOTAL_POINT,
} from '../../../../../Enum';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { Render } from '@eva/plugin-renderer-render';
import SpikesOneSubStateMachine from './SpikesOneSubStateMachine';
import SpikesTwoSubStateMachine from './SpikesTwoSubStateMachine';
import SpikesThreeSubStateMachine from './SpikesThreeSubStateMachine';
import SpikesFourSubStateMachine from './SpikesFourSubStateMachine';

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
export default class SpikesStateMachine extends StateMachine {
  init() {
      this.gameObject.addComponent(new SpriteAnimation({
          autoPlay: true,
          resource: '',
          speed:1000,
      }));
    this.gameObject.addComponent(new Render());

    this.initParams();
  }

  start() {
    // this.states.set(ENEMY_TYPE_ENUM.SPIKES_ONE, new SpikesOneSubStateMachine(this.gameObject));
    // this.states.set(ENEMY_TYPE_ENUM.SPIKES_TWO, new SpikesTwoSubStateMachine(this.gameObject));
    // this.states.set(ENEMY_TYPE_ENUM.SPIKES_THREE, new SpikesThreeSubStateMachine(this.gameObject));
    // this.states.set(ENEMY_TYPE_ENUM.SPIKES_FOUR, new SpikesFourSubStateMachine(this.gameObject));

    const value = this.params.get(PARAMS_NAME.SPIKES_TYPE).value;
    this.currentState = this.states.get(SPIKES_TYPE_TOTAL_POINT[value as number]);
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
    //   case this.states.get(ENEMY_TYPE_ENUM.SPIKES_ONE):
    //     // if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 2) {
    //     // 	this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_ONE)
    //     // }else
    //     if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 3) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_TWO);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 4) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_THREE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 5) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_FOUR);
    //     }
    //     break;
    //   case this.states.get(ENEMY_TYPE_ENUM.SPIKES_TWO):
    //     if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 2) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_ONE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 4) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_THREE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 5) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_FOUR);
    //     }
    //     break;
    //   case this.states.get(ENEMY_TYPE_ENUM.SPIKES_THREE):
    //     if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 2) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_ONE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 3) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_TWO);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 5) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_FOUR);
    //     }
    //     break;
    //   case this.states.get(ENEMY_TYPE_ENUM.SPIKES_FOUR):
    //     if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 2) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_ONE);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 3) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_TWO);
    //     } else if (this.params.get(PARAMS_NAME.SPIKES_TYPE).value === 4) {
    //       this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_THREE);
    //     }
    //     break;
    //   default:
    //     this.currentState = this.states.get(ENEMY_TYPE_ENUM.SPIKES_ONE);
    //     break;
    // }

    super.update();
  }
}
