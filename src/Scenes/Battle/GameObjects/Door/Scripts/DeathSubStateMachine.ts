import DeathState from './Death/DeathState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';

export default class DeathSubStateMachine extends DirectionStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(DIRECTION_ENUM.TOP, new DeathState(this.go, 'door_death', 1));
    this.states.set(DIRECTION_ENUM.BOTTOM, new DeathState(this.go, 'door_death', 1));
    this.states.set(DIRECTION_ENUM.LEFT, new DeathState(this.go, 'door_death', 1));
    this.states.set(DIRECTION_ENUM.RIGHT, new DeathState(this.go, 'door_death', 1));
  }
}
