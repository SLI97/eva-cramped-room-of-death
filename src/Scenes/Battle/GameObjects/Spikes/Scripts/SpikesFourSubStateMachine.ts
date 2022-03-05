import { SPIKES_COUNT_ENUM } from '../../../../../Enum';
import State from '../../../../../Base/State';
import StateMachine from '../../../../../Base/StateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import SpikesSubStateMachine from './SpikesSubStateMachine';

export default class SpikesFourSubStateMachine extends SpikesSubStateMachine {
  constructor(fsm: StateMachine, spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(SPIKES_COUNT_ENUM.ZERO, new State(spriteAnimation, 'spikes_four_zero', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.ONE, new State(spriteAnimation, 'spikes_four_one', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.TWO, new State(spriteAnimation, 'spikes_four_two', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.THREE, new State(spriteAnimation, 'spikes_four_three', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.FOUR, new State(spriteAnimation, 'spikes_four_four', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.FIVE, new State(spriteAnimation, 'spikes_four_five', 1));
  }
}
