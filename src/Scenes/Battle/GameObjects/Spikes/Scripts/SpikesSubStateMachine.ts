import { PARAMS_NAME, SPIKES_POINT_MAP_NUMBER } from '../../../../../Enum';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesSubStateMachine extends SubStateMachine {
  run() {
    const { value: newCount } = this.fsm.params.get(PARAMS_NAME.SPIKES_CUR_COUNT);
    this.currentState = this.stateMachines.get(SPIKES_POINT_MAP_NUMBER[newCount as number]);
  }
}
