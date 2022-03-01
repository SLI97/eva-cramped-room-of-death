import { PARAMS_NAME, SPIKES_CUR_POINT_ENUM, SPIKES_POINT_MAP_NUMBER } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import SubStateMachine from '../../../../../Base/SubStateMachine';
import State from '../../../../../Base/State';

export default class SpikesFourSubStateMachine extends SubStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(SPIKES_CUR_POINT_ENUM.ZERO, new State(this.go, 'spikes_four_zero', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.ONE, new State(this.go, 'spikes_four_one', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.TWO, new State(this.go, 'spikes_four_two', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.THREE, new State(this.go, 'spikes_four_three', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.FOUR, new State(this.go, 'spikes_four_four', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.FIVE, new State(this.go, 'spikes_four_five', 1));
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
      case this.states.get(SPIKES_CUR_POINT_ENUM.FOUR):
        this.switch(SPIKES_CUR_POINT_ENUM.FOUR);
        break;
      case this.states.get(SPIKES_CUR_POINT_ENUM.FIVE):
        this.switch(SPIKES_CUR_POINT_ENUM.FIVE);
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
