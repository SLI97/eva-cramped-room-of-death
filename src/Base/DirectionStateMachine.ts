import SubStateMachine from './SubStateMachine';
import { DIRECTION_ORDER_ENUM, PARAMS_NAME } from '../Enum';

/***
 * 方向子状态机，绝大部分有方向的物体（除了地刺和地裂），都继承此子状态机（人物，骷髅，门，烟雾等）
 */
export default abstract class DirectionStateMachine extends SubStateMachine {
  run() {
    const { value: newDirection } = this.fsm.params.get(PARAMS_NAME.DIRECTION);
    this.currentState = this.stateMachines.get(DIRECTION_ORDER_ENUM[newDirection as number]);
  }
}
