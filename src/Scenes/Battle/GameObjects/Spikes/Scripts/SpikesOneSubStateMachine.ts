import { PARAMS_NAME, SPIKES_CUR_POINT_ENUM, SPIKES_POINT_MAP_NUMBER } from '../../../../../Enum';
import SubStateMachine from '../../../../../Base/SubStateMachine';
import State from '../../../../../Base/State';
import StateMachine from '../../../../../Base/StateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';

export default class SpikesOneSubStateMachine extends SubStateMachine {
  constructor(fsm: StateMachine, spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(SPIKES_CUR_POINT_ENUM.ZERO, new State(spriteAnimation, 'spikes_one_zero', 1));
    this.stateMachines.set(SPIKES_CUR_POINT_ENUM.ONE, new State(spriteAnimation, 'spikes_one_one', 1));
    this.stateMachines.set(SPIKES_CUR_POINT_ENUM.TWO, new State(spriteAnimation, 'spikes_one_two', 1));
  }

  run() {
    const { value: newCount } = this.fsm.params.get(PARAMS_NAME.SPIKES_CUR_COUNT);
    this.currentState = this.stateMachines.get(SPIKES_POINT_MAP_NUMBER[newCount as number]);
  }
}
