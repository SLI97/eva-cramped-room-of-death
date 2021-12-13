import SpikesOneState from './SpikesOne/SpikesOneState';
import { SPIKES_CUR_POINT_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesOneSubStateMachine extends SubStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(SPIKES_CUR_POINT_ENUM.ZERO, new SpikesOneState(this.go, 'spikes_one_zero'));
    this.states.set(SPIKES_CUR_POINT_ENUM.ONE, new SpikesOneState(this.go, 'spikes_one_one'));
    this.states.set(SPIKES_CUR_POINT_ENUM.TWO, new SpikesOneState(this.go, 'spikes_one_two'));
  }
}
