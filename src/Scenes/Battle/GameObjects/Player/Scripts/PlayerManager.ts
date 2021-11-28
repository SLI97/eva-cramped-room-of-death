import { CONTROLLER_ENUM, DIRECTION_ENUM, EVENT_ENUM, PLAYER_STATE } from '../../../../../Enum';
import EventManager from '../../../../../Runtime/EventManager';
import DataManager from '../../../../../Runtime/DataManager';
import { IPlayer } from '../../../../../Levels';
import EntityManager from '../../../../../Base/EntityManager';
import { TILE_WIDTH, TILE_HEIGHT } from '../../Tile/Tile';
import PlayerStateMachine from './PlayerStateMachine';

export default class PlayerManager extends EntityManager {
  static componentName = 'PlayerManager'; // 设置组件的名字

  targetX: number;
  targetY: number;
  isMoveEnd: boolean;
  speed = 1 / 10;

  init(player: IPlayer) {
    this.x = player.x;
    this.y = player.y;
    this.targetX = this.x;
    this.targetY = this.y;
    this.state = player.state;
    this.direction = player.direction;
    this.isMoveEnd = true;

    this.gameObject.addComponent(new PlayerStateMachine());
    EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.inputProcess, this);
    // EventManager.Instance.on(EVENT_ENUM.ATTACK_PLAYER, this.onDead, this);
  }

  update() {
    this.updateXY();
    this.updatePosition();
  }

  /***
   * 更新人物位置
   */
  updatePosition() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - 16 * 3;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - 16 * 3;
  }

  /***
   * 更新人物坐标
   */
  updateXY() {
    if (this.targetX < this.x) {
      this.x -= this.speed;
    } else if (this.targetX > this.x) {
      this.x += this.speed;
    }

    if (this.targetY < this.y) {
      this.y -= this.speed;
    } else if (this.targetY > this.y) {
      this.y += this.speed;
    }

    if (Math.abs(this.targetX - this.x) < 0.01) {
      this.x = this.targetX;
      this.onMoveEnd();
    }
    if (Math.abs(this.targetY - this.y) < 0.01) {
      this.y = this.targetY;
      this.onMoveEnd();
    }
  }

  onMoveEnd() {
    this.isMoveEnd = true;
    // EventManager.Instance.emit(EVENT_ENUM.PLAYER_MOVE_END);
  }

  /***
   * 响应玩家操作
   * @param type
   */
  inputProcess(type: CONTROLLER_ENUM) {
    if (!this.isMoveEnd) {
      return;
    }

    if (
      this.state === PLAYER_STATE.DEATH ||
      this.state === PLAYER_STATE.AIRDEATH ||
      this.state === PLAYER_STATE.ATTACK
    ) {
      return;
    }

    // const id = this.attackEnemy(type);
    // if (id !== -1) {
    //   EventManager.Instance.emit(EVENT_ENUM.RECORD_STEP);
    //   EventManager.Instance.emit(EVENT_ENUM.PLAYER_MOVE_END);
    //   this.state = PLAYER_STATE.ATTACK;
    //   EventManager.Instance.emit(EVENT_ENUM.ATTACK_ENEMY, id);
    //   return;
    // }

    // if (this.WillBlock(type)) {
    //   if (type === CONTROLLER_ENUM.TOP || type === CONTROLLER_ENUM.BOTTOM) {
    //     EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, 1);
    //   } else if (type === CONTROLLER_ENUM.LEFT || type === CONTROLLER_ENUM.RIGHT) {
    //     EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, 0);
    //   } else if (type === CONTROLLER_ENUM.TURNLEFT || type === CONTROLLER_ENUM.TURNRIGHT) {
    //     if (this.direction === DIRECTION_ENUM.TOP || this.direction === DIRECTION_ENUM.BOTTOM) {
    //       EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, 0);
    //     } else if (this.direction === DIRECTION_ENUM.LEFT || this.direction === DIRECTION_ENUM.RIGHT) {
    //       EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, 1);
    //     }
    //   }
    //   return;
    // }

    this.move(type);
  }

  /***
   * 根据type玩家移动
   * @param type 控制类型CONTROLLER_ENUM之一
   */
  move(type: CONTROLLER_ENUM) {
    EventManager.Instance.emit(EVENT_ENUM.RECORD_STEP);
    if (type === CONTROLLER_ENUM.TOP) {
      this.targetY -= 1;
      this.state = PLAYER_STATE.IDLE;
      this.isMoveEnd = false;
      this.showSmoke(DIRECTION_ENUM.TOP);
    } else if (type === CONTROLLER_ENUM.BOTTOM) {
      this.targetY += 1;
      this.state = PLAYER_STATE.IDLE;
      this.isMoveEnd = false;
      this.showSmoke(DIRECTION_ENUM.BOTTOM);
    } else if (type === CONTROLLER_ENUM.LEFT) {
      this.targetX -= 1;
      this.state = PLAYER_STATE.IDLE;
      this.isMoveEnd = false;
      this.showSmoke(DIRECTION_ENUM.LEFT);
    } else if (type === CONTROLLER_ENUM.RIGHT) {
      this.targetX += 1;
      this.state = PLAYER_STATE.IDLE;
      this.isMoveEnd = false;
      this.showSmoke(DIRECTION_ENUM.RIGHT);
    } else if (type === CONTROLLER_ENUM.TURNLEFT) {
      this.state = PLAYER_STATE.TURNLEFT;
      if (this.direction === DIRECTION_ENUM.TOP) {
        this.direction = DIRECTION_ENUM.LEFT;
      } else if (this.direction === DIRECTION_ENUM.LEFT) {
        this.direction = DIRECTION_ENUM.BOTTOM;
      } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
        this.direction = DIRECTION_ENUM.RIGHT;
      } else if (this.direction === DIRECTION_ENUM.RIGHT) {
        this.direction = DIRECTION_ENUM.TOP;
      }
      this.state = PLAYER_STATE.TURNLEFT;
      EventManager.Instance.emit(EVENT_ENUM.PLAYER_MOVE_END);
    } else if (type === CONTROLLER_ENUM.TURNRIGHT) {
      this.state = PLAYER_STATE.TURNRIGHT;
      if (this.direction === DIRECTION_ENUM.TOP) {
        this.direction = DIRECTION_ENUM.RIGHT;
      } else if (this.direction === DIRECTION_ENUM.LEFT) {
        this.direction = DIRECTION_ENUM.TOP;
      } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
        this.direction = DIRECTION_ENUM.LEFT;
      } else if (this.direction === DIRECTION_ENUM.RIGHT) {
        this.direction = DIRECTION_ENUM.BOTTOM;
      }
      this.state = PLAYER_STATE.TURNRIGHT;
      EventManager.Instance.emit(EVENT_ENUM.PLAYER_MOVE_END);
    }
  }

  showSmoke(type: DIRECTION_ENUM) {
    // console.log(type);
  }

  /***
   * 检查枪所在方向是否有敌人，有则攻击
   * @param type
   */
  attackEnemy(type: CONTROLLER_ENUM) {
    const enemies = DataManager.Instance.enemies.filter((enemy: any) => enemy.state !== PLAYER_STATE.DEATH);
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const { x: enemyX, y: enemyY, id: enemyId } = enemy;
      if (
        this.direction === DIRECTION_ENUM.TOP &&
        type === CONTROLLER_ENUM.TOP &&
        enemyY === this.targetY - 2 &&
        enemyX === this.x
      ) {
        return enemyId;
      } else if (
        this.direction === DIRECTION_ENUM.BOTTOM &&
        type === CONTROLLER_ENUM.BOTTOM &&
        enemyY === this.targetY + 2 &&
        enemyX === this.x
      ) {
        return enemyId;
      } else if (
        this.direction === DIRECTION_ENUM.LEFT &&
        type === CONTROLLER_ENUM.LEFT &&
        enemyX === this.targetX - 2 &&
        enemyY === this.y
      ) {
        return enemyId;
      } else if (
        this.direction === DIRECTION_ENUM.RIGHT &&
        type === CONTROLLER_ENUM.RIGHT &&
        enemyX === this.targetX + 2 &&
        enemyY === this.y
      ) {
        return enemyId;
      }
    }

    return -1;
  }

  /***
   * 判断角色是否能按预期进行移动
   * @param type
   */
  WillBlock(type: CONTROLLER_ENUM) {
    const { targetX: x, targetY: y, direction } = this;
    const { tileGoInfo: tileInfo } = DataManager.Instance;
    const enemies = DataManager.Instance.enemies.filter(enemy => enemy.state !== PLAYER_STATE.DEATH);
    const { x: doorX, y: doorY, state: doorState } = DataManager.Instance.door;
    const bursts = DataManager.Instance.bursts.filter(burst => burst.state !== PLAYER_STATE.DEATH);

    const { mapRowCount: row, mapColumnCount: column } = DataManager.Instance;

    //按钮方向——向上
    if (type === CONTROLLER_ENUM.TOP) {
      const playerNextY = y - 1;

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        //判断是否超出地图
        if (playerNextY < 0) {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }

        const weaponNextY = y - 2;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[x]?.[weaponNextY];

        //判断门
        if (
          ((doorX === x && doorY === playerNextY) || (doorX === x && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === x && enemyY === weaponNextY) || (enemyX === x && enemyY === playerNextY)) {
            this.state = PLAYER_STATE.BLOCKFRONT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === x && burst.y === playerNextY) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        //判断是否超出地图
        if (playerNextY < 0) {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }

        const weaponNextY = y;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[x]?.[weaponNextY];

        //判断门
        if (
          ((doorX === x && doorY === playerNextY) || (doorX === x && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if (enemyX === x && enemyY === playerNextY) {
            this.state = PLAYER_STATE.BLOCKBACK;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === x && burst.y === playerNextY) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        //判断是否超出地图
        if (playerNextY < 0) {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y - 1;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //判断门
        if (
          ((doorX === x && doorY === playerNextY) || (doorX === weaponNextX && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === x && enemyY === playerNextY) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
            this.state = PLAYER_STATE.BLOCKRIGHT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === x && burst.y === playerNextY) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        //判断是否超出地图
        if (playerNextY < 0) {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y - 1;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //判断门
        if (
          ((doorX === x && doorY === playerNextY) || (doorX === weaponNextX && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === x && enemyY === playerNextY) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
            this.state = PLAYER_STATE.BLOCKLEFT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === x && burst.y === playerNextY) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }
      }

      //按钮方向——向下
    } else if (type === CONTROLLER_ENUM.BOTTOM) {
      const playerNextY = y + 1;

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        if (playerNextY > column - 1) {
          this.state = PLAYER_STATE.BLOCKBACK;

          return true;
        }

        const weaponNextY = y;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[x]?.[weaponNextY];

        //判断门
        if (
          ((doorX === x && doorY === playerNextY) || (doorX === x && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if (enemyX === x && enemyY === playerNextY) {
            this.state = PLAYER_STATE.BLOCKBACK;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === x && burst.y === playerNextY) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        if (playerNextY > column - 1) {
          this.state = PLAYER_STATE.BLOCKFRONT;

          return true;
        }

        const weaponNextY = y + 2;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[x]?.[weaponNextY];

        //判断门
        if (
          ((doorX === x && doorY === playerNextY) || (doorX === x && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === x && enemyY === weaponNextY) || (enemyX === x && enemyY === playerNextY)) {
            this.state = PLAYER_STATE.BLOCKFRONT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === x && burst.y === playerNextY) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        if (playerNextY > column - 1) {
          this.state = PLAYER_STATE.BLOCKLEFT;

          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y + 1;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //判断门
        if (
          ((doorX === x && doorY === playerNextY) || (doorX === weaponNextX && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === x && enemyY === playerNextY) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
            this.state = PLAYER_STATE.BLOCKLEFT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === x && burst.y === playerNextY) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        if (playerNextY > column - 1) {
          this.state = PLAYER_STATE.BLOCKRIGHT;

          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y + 1;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //判断门
        if (
          ((doorX === x && doorY === playerNextY) || (doorX === weaponNextX && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === x && enemyY === playerNextY) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
            this.state = PLAYER_STATE.BLOCKRIGHT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === x && burst.y === playerNextY) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }
      }

      //按钮方向——向左
    } else if (type === CONTROLLER_ENUM.LEFT) {
      const playerNextX = x - 1;

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        //判断是否超出地图
        if (playerNextX < 0) {
          this.state = PLAYER_STATE.BLOCKLEFT;

          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y - 1;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //判断门
        if (
          ((doorX === playerNextX && doorY === y) || (doorX === weaponNextX && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
            this.state = PLAYER_STATE.BLOCKLEFT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === playerNextX && burst.y === y) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        //判断是否超出地图
        if (playerNextX < 0) {
          this.state = PLAYER_STATE.BLOCKRIGHT;

          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y + 1;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //判断门
        if (
          ((doorX === playerNextX && doorY === y) || (doorX === weaponNextX && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
            this.state = PLAYER_STATE.BLOCKRIGHT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === playerNextX && burst.y === y) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        //判断是否超出地图
        if (playerNextX < 0) {
          this.state = PLAYER_STATE.BLOCKFRONT;

          return true;
        }

        const weaponNextX = x - 2;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[y];

        //判断门
        if (
          ((doorX === playerNextX && doorY === y) || (doorX === weaponNextX && doorY === y)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === y)) {
            this.state = PLAYER_STATE.BLOCKFRONT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === playerNextX && burst.y === y) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        //判断是否超出地图
        if (playerNextX < 0) {
          this.state = PLAYER_STATE.BLOCKBACK;

          return true;
        }

        const weaponNextX = x;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[y];

        //判断门
        if (
          ((doorX === playerNextX && doorY === y) || (doorX === weaponNextX && doorY === y)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if (enemyX === playerNextX && enemyY === y) {
            this.state = PLAYER_STATE.BLOCKBACK;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === playerNextX && burst.y === y) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }
      }

      //按钮方向——向右
    } else if (type === CONTROLLER_ENUM.RIGHT) {
      const playerNextX = x + 1;

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        if (playerNextX > row - 1) {
          this.state = PLAYER_STATE.BLOCKRIGHT;

          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y - 1;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //判断门
        if (
          ((doorX === playerNextX && doorY === y) || (doorX === weaponNextX && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
            this.state = PLAYER_STATE.BLOCKRIGHT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === playerNextX && burst.y === y) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKRIGHT;
          return true;
        }

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        if (playerNextX > row - 1) {
          this.state = PLAYER_STATE.BLOCKLEFT;

          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y + 1;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //判断门
        if (
          ((doorX === playerNextX && doorY === y) || (doorX === weaponNextX && doorY === weaponNextY)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
            this.state = PLAYER_STATE.BLOCKLEFT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === playerNextX && burst.y === y) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKLEFT;
          return true;
        }

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        if (playerNextX > row - 1) {
          this.state = PLAYER_STATE.BLOCKBACK;

          return true;
        }

        const weaponNextX = x;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[y];

        //判断门
        if (
          ((doorX === playerNextX && doorY === y) || (doorX === weaponNextX && doorY === y)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if (enemyX === playerNextX && enemyY === y) {
            this.state = PLAYER_STATE.BLOCKBACK;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === playerNextX && burst.y === y) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKBACK;
          return true;
        }

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        if (playerNextX > row - 1) {
          this.state = PLAYER_STATE.BLOCKFRONT;

          return true;
        }

        const weaponNextX = x + 2;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[y];

        //判断门
        if (
          ((doorX === playerNextX && doorY === y) || (doorX === weaponNextX && doorY === y)) &&
          doorState !== PLAYER_STATE.DEATH
        ) {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }

        //判断敌人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const { x: enemyX, y: enemyY } = enemy;

          if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === y)) {
            this.state = PLAYER_STATE.BLOCKFRONT;
            return true;
          }
        }

        //判断地裂陷阱
        if (
          bursts.some(burst => burst.x === playerNextX && burst.y === y) &&
          (!nextWeaponTile || nextWeaponTile.turnable)
        ) {
          return false;
        }

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
        } else {
          this.state = PLAYER_STATE.BLOCKFRONT;
          return true;
        }
      }

      //按钮方向——左转
    } else if (type === CONTROLLER_ENUM.TURNLEFT) {
      let nextY, nextX;
      if (direction === DIRECTION_ENUM.TOP) {
        //朝上左转的话，左上角三个tile都必须turnable为true，并且没有敌人
        nextY = y - 1;
        nextX = x - 1;
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        nextY = y + 1;
        nextX = x + 1;
      } else if (direction === DIRECTION_ENUM.LEFT) {
        nextY = y + 1;
        nextX = x - 1;
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        nextY = y - 1;
        nextX = x + 1;
      }

      //判断门
      if (
        ((doorX === x && doorY === nextY) ||
          (doorX === nextX && doorY === y) ||
          (doorX === nextX && doorY === nextY)) &&
        doorState !== PLAYER_STATE.DEATH
      ) {
        this.state = PLAYER_STATE.BLOCKTURNLEFT;
        return true;
      }

      //判断敌人
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const { x: enemyX, y: enemyY } = enemy;

        if (enemyX === nextX && enemyY === y) {
          this.state = PLAYER_STATE.BLOCKTURNLEFT;

          return true;
        } else if (enemyX === nextX && enemyY === nextY) {
          this.state = PLAYER_STATE.BLOCKTURNLEFT;

          return true;
        } else if (enemyX === x && enemyY === nextY) {
          this.state = PLAYER_STATE.BLOCKTURNLEFT;

          return true;
        }
      }

      //最后判断地图元素
      if (
        (!tileInfo[x]?.[nextY] || tileInfo[x]?.[nextY].turnable) &&
        (!tileInfo[nextX]?.[y] || tileInfo[nextX]?.[y].turnable) &&
        (!tileInfo[nextX]?.[nextY] || tileInfo[nextX]?.[nextY].turnable)
      ) {
      } else {
        this.state = PLAYER_STATE.BLOCKTURNLEFT;
        return true;
      }

      //按钮方向——右转
    } else if (type === CONTROLLER_ENUM.TURNRIGHT) {
      let nextX, nextY;
      if (direction === DIRECTION_ENUM.TOP) {
        //朝上右转的话，右上角三个tile都必须turnable为true
        nextY = y - 1;
        nextX = x + 1;
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        nextY = y + 1;
        nextX = x - 1;
      } else if (direction === DIRECTION_ENUM.LEFT) {
        nextY = y - 1;
        nextX = x - 1;
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        nextY = y + 1;
        nextX = x + 1;
      }

      //判断门
      if (
        ((doorX === x && doorY === nextY) ||
          (doorX === nextX && doorY === y) ||
          (doorX === nextX && doorY === nextY)) &&
        doorState !== PLAYER_STATE.DEATH
      ) {
        this.state = PLAYER_STATE.BLOCKTURNRIGHT;
        return true;
      }

      //判断敌人
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const { x: enemyX, y: enemyY } = enemy;

        if (enemyX === nextX && enemyY === y) {
          this.state = PLAYER_STATE.BLOCKTURNRIGHT;

          return true;
        } else if (enemyX === nextX && enemyY === nextY) {
          this.state = PLAYER_STATE.BLOCKTURNRIGHT;

          return true;
        } else if (enemyX === x && enemyY === nextY) {
          this.state = PLAYER_STATE.BLOCKTURNRIGHT;

          return true;
        }
      }

      //最后判断地图元素
      if (
        (!tileInfo[x]?.[nextY] || tileInfo[x]?.[nextY].turnable) &&
        (!tileInfo[nextX]?.[y] || tileInfo[nextX]?.[y].turnable) &&
        (!tileInfo[nextX]?.[nextY] || tileInfo[nextX]?.[nextY].turnable)
      ) {
      } else {
        this.state = PLAYER_STATE.BLOCKTURNRIGHT;
        return true;
      }
    }

    return false;
  }
}
