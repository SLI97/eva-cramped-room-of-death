import {
  TILE_TYPE_ENUM,
  DIRECTION_ENUM,
  ENEMY_TYPE_ENUM,
  PLAYER_STATE,
} from '../Enum/index'

const mapInfo = [
  [
    {
      'src': 16,
      'type': TILE_TYPE_ENUM.WALL_LEFT_TOP,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 23,
      'type': TILE_TYPE_ENUM.WALL_LEFT_BOTTOM,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 20,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 21,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 24,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
    {
      'src': null,
      'type': null,
    },
  ],
]

const player = {
  x: 1,
  y: 7,
  direction: DIRECTION_ENUM.TOP,
  state: PLAYER_STATE.IDLE
}

const enemies = [
  {
    x: 8,
    y: 1,
    direction: DIRECTION_ENUM.LEFT,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_WOODEN
  }
]

const spikes = []

const bursts = [
  {
    x: 1,
    y: 2,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 1,
    y: 5,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 1,
    y: 6,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 2,
    y: 1,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 3,
    y: 1,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 4,
    y: 1,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 5,
    y: 1,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 6,
    y: 1,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 6,
    y: 2,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
]

const door = {
  x: 9,
  y: 1,
  direction: DIRECTION_ENUM.LEFT,
  state: PLAYER_STATE.IDLE,
  type: ENEMY_TYPE_ENUM.DOOR
}

const level8 = {
  mapInfo,
  player,
  enemies,
  spikes,
  bursts,
  door
}

export {
  level8
}
