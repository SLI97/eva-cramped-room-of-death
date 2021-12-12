import SpikesOnePointState from './SpikesOnePointState'

export default class SpikesOnePointTwoState extends SpikesOnePointState{
	constructor(owner,fsm,animations) {
		super(owner, fsm, animations)
	}


	callback() {
		this.owner.backZero()
	}
}
