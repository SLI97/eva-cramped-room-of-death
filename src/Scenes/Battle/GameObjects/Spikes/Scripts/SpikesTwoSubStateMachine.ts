import SpikesTwoState from './SpikesTwo/SpikesTwoState';
import { PARAMS_NAME, SPIKES_CUR_POINT_ENUM, SPIKES_POINT_MAP_NUMBER } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesTwoSubStateMachine extends SubStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(SPIKES_CUR_POINT_ENUM.ZERO, new SpikesTwoState(this.go, 'spikes_two_zero',1));
    this.states.set(SPIKES_CUR_POINT_ENUM.ONE, new SpikesTwoState(this.go, 'spikes_two_one',1));
    this.states.set(SPIKES_CUR_POINT_ENUM.TWO, new SpikesTwoState(this.go, 'spikes_two_two',1));
    this.states.set(SPIKES_CUR_POINT_ENUM.THREE, new SpikesTwoState(this.go, 'spikes_two_three',1));
  }

  update() {
    const currentState = this.currentState;
    switch (currentState) {
      case this.states.get(SPIKES_CUR_POINT_ENUM.ZERO):
        this.switch(SPIKES_CUR_POINT_ENUM.ZERO);
        break;
      case this.states.get(SPIKES_CUR_POINT_ENUM.ONE):
        this.switch(SPIKES_CUR_POINT_ENUM.ONE);
        break;
      case this.states.get(SPIKES_CUR_POINT_ENUM.TWO):
        this.switch(SPIKES_CUR_POINT_ENUM.TWO);
        break;
      case this.states.get(SPIKES_CUR_POINT_ENUM.THREE):
        this.switch(SPIKES_CUR_POINT_ENUM.THREE);
        break;
      default:
        this.currentState = this.states.get(SPIKES_CUR_POINT_ENUM.ZERO);
        break;
    }
  }

  switch(curCount: SPIKES_CUR_POINT_ENUM) {
    const value = this.params.get(PARAMS_NAME.CUR_POINT_COUNT).value;
    if (SPIKES_POINT_MAP_NUMBER[curCount] === value) {
      return;
    }

    this.currentState = this.states.get(SPIKES_POINT_MAP_NUMBER[value as number]);
  }
}

