import SpikesThreeState from './SpikesThree/SpikesThreeState';
import { PARAMS_NAME, SPIKES_CUR_POINT_ENUM, SPIKES_POINT_MAP_NUMBER } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesThreeSubStateMachine extends SubStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(SPIKES_CUR_POINT_ENUM.ZERO, new SpikesThreeState(this.go, 'spikes_three_zero', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.ONE, new SpikesThreeState(this.go, 'spikes_three_one', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.TWO, new SpikesThreeState(this.go, 'spikes_three_two', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.THREE, new SpikesThreeState(this.go, 'spikes_three_three', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.FOUR, new SpikesThreeState(this.go, 'spikes_three_four', 1));
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
