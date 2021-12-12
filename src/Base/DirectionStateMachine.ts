import SubStateMachine from './SubStateMachine';
import { DIRECTION_ENUM, DIRECTION_ORDER, PARAMS_NAME } from '../Enum';

export default class DirectionStateMachine extends SubStateMachine {
  update() {
    switch (this.currentState) {
      case this.states.get(DIRECTION_ENUM.TOP):
        this.switch(DIRECTION_ENUM.TOP);
        break;
      case this.states.get(DIRECTION_ENUM.BOTTOM):
        this.switch(DIRECTION_ENUM.BOTTOM);
        break;
      case this.states.get(DIRECTION_ENUM.LEFT):
        this.switch(DIRECTION_ENUM.LEFT);
        break;
      case this.states.get(DIRECTION_ENUM.RIGHT):
        this.switch(DIRECTION_ENUM.RIGHT);
        break;
      default:
        this.currentState = this.states.get(this.manager.direction);
          console.log(222);
          break;
    }
  }

  switch(type: DIRECTION_ENUM) {
    const { value } = this.params.get(PARAMS_NAME.DIRECTION);
    if (DIRECTION_ORDER.findIndex(i => i === type) === value) {
      return;
    }

    this.currentState = this.states.get(DIRECTION_ORDER.find((_, index) => value === index));
  }
}
