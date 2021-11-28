import { IDoor } from '../../../../../Levels';
import { Component } from '@eva/eva.js';

import EntityManager from '../../../../../Base/EntityManager';
import { TILE_HEIGHT, TILE_WIDTH } from '../../Tile/Tile';
import DoorStateMachine from './DoorStateMachine';

/***
 * 关卡门类
 */
export default class DoorManager extends EntityManager {
  init(door: IDoor) {
    this.x = door.x;
    this.y = door.y;
    this.state = door.state;
    this.direction = door.direction;

    this.gameObject.transform.position.x = this.x * TILE_WIDTH - 16 * 3;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - 16 * 3;
  }

  start() {
    this.gameObject.addComponent(new DoorStateMachine());
  }

  // off() {
  //   // EventManager.Instance.off(EVENT_ENUM.OPENDOOR, this.onOpenHandler)
  // }

  // onOpen() {
  // 	const enemies = DataManager.Instance.enemies.filter(enemy => enemy.state !== PLAYER_STATE.DEATH)
  // 	if (enemies.length === 0) {
  // 		this.state = PLAYER_STATE.DEATH
  // 	}
  // }

  update() {
    // if (DataManager.Instance.enemies && DataManager.Instance.enemies.every(i => i.state === PLAYER_STATE.DEATH) &&
    //     this.state !== PLAYER_STATE.DEATH) {
    //     this.state = PLAYER_STATE.DEATH
    // }
  }
}
