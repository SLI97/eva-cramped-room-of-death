import SubStateMachine from './SubStateMachine';
import { DIRECTION_ENUM, DIRECTION_ORDER_ENUM, PARAMS_NAME } from '../Enum';

/***
 * 方向子状态机，绝大部分有方向的物体（除了地刺和地裂），都继承此子状态机（人物，骷髅，门，烟雾等）
 */
export default class DirectionStateMachine extends SubStateMachine {
  update() {
    switch (this.currentState) {
      case this.states.get(DIRECTION_ENUM.TOP):
      case this.states.get(DIRECTION_ENUM.BOTTOM):
      case this.states.get(DIRECTION_ENUM.LEFT):
      case this.states.get(DIRECTION_ENUM.RIGHT):
        const { value } = this.params.get(PARAMS_NAME.DIRECTION);
        this.currentState = this.states.get(DIRECTION_ORDER_ENUM[value as number]);
      default:
        this.currentState = this.states.get(this.manager.direction);
        break;
    }
  }
}
