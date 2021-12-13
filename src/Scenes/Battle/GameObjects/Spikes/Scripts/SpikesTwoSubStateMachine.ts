import SpikesTwoState from './SpikesTwo/SpikesTwoState';
import { SPIKES_CUR_POINT_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesTwoSubStateMachine extends SubStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(SPIKES_CUR_POINT_ENUM.ZERO, new SpikesTwoState(this.go, 'spikes_two_zero'));
    this.states.set(SPIKES_CUR_POINT_ENUM.ONE, new SpikesTwoState(this.go, 'spikes_two_one'));
    this.states.set(SPIKES_CUR_POINT_ENUM.TWO, new SpikesTwoState(this.go, 'spikes_two_two'));
    this.states.set(SPIKES_CUR_POINT_ENUM.THREE, new SpikesTwoState(this.go, 'spikes_two_three'));
  }
}
