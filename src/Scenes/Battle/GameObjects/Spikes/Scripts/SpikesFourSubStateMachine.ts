import SpikesFourState from './SpikesFour/SpikesFourState';
import { SPIKES_CUR_POINT_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesFourSubStateMachine extends SubStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(SPIKES_CUR_POINT_ENUM.ZERO, new SpikesFourState(this.go, 'spikes_four_zero'));
    this.states.set(SPIKES_CUR_POINT_ENUM.ONE, new SpikesFourState(this.go, 'spikes_four_one'));
    this.states.set(SPIKES_CUR_POINT_ENUM.TWO, new SpikesFourState(this.go, 'spikes_four_two'));
    this.states.set(SPIKES_CUR_POINT_ENUM.THREE, new SpikesFourState(this.go, 'spikes_four_three'));
    this.states.set(SPIKES_CUR_POINT_ENUM.FOUR, new SpikesFourState(this.go, 'spikes_four_four'));
    this.states.set(SPIKES_CUR_POINT_ENUM.FIVE, new SpikesFourState(this.go, 'spikes_four_five'));
  }
}
