import SpikesThreeState from './SpikesThree/SpikesThreeState';
import { SPIKES_CUR_POINT_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesThreeSubStateMachine extends SubStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(SPIKES_CUR_POINT_ENUM.ZERO, new SpikesThreeState(this.go, 'spikes_three_zero'));
    this.states.set(SPIKES_CUR_POINT_ENUM.ONE, new SpikesThreeState(this.go, 'spikes_three_one'));
    this.states.set(SPIKES_CUR_POINT_ENUM.TWO, new SpikesThreeState(this.go, 'spikes_three_two'));
    this.states.set(SPIKES_CUR_POINT_ENUM.THREE, new SpikesThreeState(this.go, 'spikes_three_three'));
    this.states.set(SPIKES_CUR_POINT_ENUM.FOUR, new SpikesThreeState(this.go, 'spikes_three_four'));
  }
}
