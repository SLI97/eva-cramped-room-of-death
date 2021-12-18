import SpikesOneState from './SpikesOne/SpikesOneState';
import { PARAMS_NAME, SPIKES_CUR_POINT_ENUM, SPIKES_POINT_MAP_NUMBER } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesOneSubStateMachine extends SubStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(SPIKES_CUR_POINT_ENUM.ZERO, new SpikesOneState(this.go, 'spikes_one_zero', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.ONE, new SpikesOneState(this.go, 'spikes_one_one', 1));
    this.states.set(SPIKES_CUR_POINT_ENUM.TWO, new SpikesOneState(this.go, 'spikes_one_two', 1));
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
