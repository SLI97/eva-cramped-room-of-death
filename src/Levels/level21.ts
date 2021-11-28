import {
  TILE_TYPE_ENUM,
  DIRECTION_ENUM,
  ENEMY_TYPE_ENUM,
  PLAYER_STATE,
} from '../Enum/index'

const mapInfo = [
  [
    {
      'src': null,
      'type': null,
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
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    }
  ],

  [
    {
      'src': null,
      'type': null,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 16,
      'type': TILE_TYPE_ENUM.WALL_LEFT_TOP,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 13,
      'type': TILE_TYPE_ENUM.WALL_LEFT_BOTTOM,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': null,
      'type': null,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
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
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': null,
      'type': null,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
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
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': null,
      'type': null,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 16,
      'type': TILE_TYPE_ENUM.WALL_LEFT_TOP,
    },
    {
      'src': 13,
      'type': TILE_TYPE_ENUM.WALL_LEFT_BOTTOM,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': null,
      'type': null,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 21,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 21,
      'type': TILE_TYPE_ENUM.WALL_RIGHT_BOOTM,
    },
    {
      'src': 19,
      'type': TILE_TYPE_ENUM.CLIFF_RIGHT,
    }
  ],

  [
    {
      'src': 20,
      'type': TILE_TYPE_ENUM.WALL_LEFT_TOP,
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
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
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
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 19,
      'type': TILE_TYPE_ENUM.CLIFF_RIGHT,
    },
    {
      'src': null,
      'type': null,
    },
  ],

  [
    {
      'src': 15,
      'type': TILE_TYPE_ENUM.WALL_RIGHT_TOP,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 14,
      'type': TILE_TYPE_ENUM.WALL_RIGHT_BOOTM,
    },
    {
      'src': 19,
      'type': TILE_TYPE_ENUM.CLIFF_RIGHT,
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
  x: 0,
  y: 7,
  direction: DIRECTION_ENUM.TOP,
  state: PLAYER_STATE.IDLE
}

const enemies = [
  {
    x: 2,
    y: 6,
    direction: DIRECTION_ENUM.LEFT,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_WOODEN
  },
]

const spikes = []

const bursts = [
  {
    x: 2,
    y: 3,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 2,
    y: 5,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 3,
    y: 3,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 3,
    y: 4,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
]

const door = {
  x: 7,
  y: 6,
  direction: DIRECTION_ENUM.LEFT,
  state: PLAYER_STATE.IDLE,
  type: ENEMY_TYPE_ENUM.DOOR
}

const level21 = {
  mapInfo,
  player,
  enemies,
  spikes,
  bursts,
  door
}

export {
  level21
}
