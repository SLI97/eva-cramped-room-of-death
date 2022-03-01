import { TILE_TYPE_ENUM, DIRECTION_ENUM, ENEMY_TYPE_ENUM, PLAYER_STATE } from '../Enum';
import { IBurst, IDoor, IEnemy, ILevel, IPlayer, ISpikes } from './index';

const mapInfo = [
  [
    {
      src: 22,
      type: TILE_TYPE_ENUM.WALL_LEFT_TOP,
    },
    {
      src: 5,
      type: TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      src: 5,
      type: TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      src: 13,
      type: TILE_TYPE_ENUM.WALL_LEFT_BOTTOM,
    },
    {
      src: 18,
      type: TILE_TYPE_ENUM.CLIFF_LEFT,
    },
  ],
  [
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 17,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 20,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 19,
      type: TILE_TYPE_ENUM.CLIFF_RIGHT,
    },
  ],
  [
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 17,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 17,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 19,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 17,
      type: TILE_TYPE_ENUM.CLIFF_RIGHT,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 17,
      type: TILE_TYPE_ENUM.CLIFF_RIGHT,
    },
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 19,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 19,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 27,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 5,
      type: TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      src: 23,
      type: TILE_TYPE_ENUM.WALL_RIGHT_BOOTM,
    },
    {
      src: 19,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      src: null,
      type: null,
    },
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 19,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 17,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 19,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 9,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 16,
      type: TILE_TYPE_ENUM.WALL_LEFT_TOP,
    },
    {
      src: 5,
      type: TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      src: 14,
      type: TILE_TYPE_ENUM.WALL_RIGHT_BOOTM,
    },
    {
      src: 19,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
  ],
  [
    {
      src: 21,
      type: TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      src: 1,
      type: TILE_TYPE_ENUM.FLOOR,
    },
    {
      src: 22,
      type: TILE_TYPE_ENUM.WALL_RIGHT_TOP,
    },
    {
      src: 14,
      type: TILE_TYPE_ENUM.WALL_RIGHT_BOOTM,
    },
    {
      src: 17,
      type: TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      src: null,
      type: null,
    },
    {
      src: null,
      type: null,
    },
  ],
];

const player: IPlayer = {
  x: 1,
  y: 0,
  direction: DIRECTION_ENUM.BOTTOM,
  state: PLAYER_STATE.IDLE,
};

const enemies: Array<IEnemy> = [
  {
    x: 3,
    y: 4,
    direction: DIRECTION_ENUM.TOP,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_WOODEN,
  },
  {
    x: 8,
    y: 3,
    direction: DIRECTION_ENUM.LEFT,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_WOODEN,
  },
];

const spikes: Array<ISpikes> = [
  {
    x: 3,
    y: 2,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0,
  },
];

const bursts: Array<IBurst> = [
  {
    x: 1,
    y: 4,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR,
  },
  {
    x: 5,
    y: 2,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR,
  },
  {
    x: 5,
    y: 4,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR,
  },
  {
    x: 7,
    y: 3,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR,
  },
  {
    x: 7,
    y: 4,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR,
  },
  {
    x: 8,
    y: 2,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR,
  },
];

const door: IDoor = {
  x: 10,
  y: 1,
  direction: DIRECTION_ENUM.LEFT,
  state: PLAYER_STATE.IDLE,
  type: ENEMY_TYPE_ENUM.DOOR,
};

const level: ILevel = {
  mapInfo,
  player,
  enemies,
  spikes,
  bursts,
  door,
};

export default level;
