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
      'src': 16,
      'type': TILE_TYPE_ENUM.WALL_LEFT_TOP,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 23,
      'type': TILE_TYPE_ENUM.WALL_RIGHT_BOOTM,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 20,
      'type': TILE_TYPE_ENUM.WALL_ROW,
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
    {
      'src': 21,
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
      'src': null,
      'type': null,
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
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 20,
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
      'src': 15,
      'type': TILE_TYPE_ENUM.WALL_RIGHT_TOP,
    },
    {
      'src': 25,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 23,
      'type': TILE_TYPE_ENUM.WALL_RIGHT_BOOTM,
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
      'src': null,
      'type': null,
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
      'src': null,
      'type': null,
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
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
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
      'src': null,
      'type': null,
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
      'src': 22,
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
    }
  ],

]

const player = {
  x: 0,
  y: 4,
  direction: DIRECTION_ENUM.RIGHT,
  state: PLAYER_STATE.IDLE
}

const enemies = [
  {
    x: 9,
    y: 1,
    direction: DIRECTION_ENUM.LEFT,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_WOODEN
  },
  {
    x: 9,
    y: 3,
    direction: DIRECTION_ENUM.LEFT,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_IRON
  },
  {
    x: 9,
    y: 4,
    direction: DIRECTION_ENUM.LEFT,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_IRON
  },
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
    y: 3,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 2,
    y: 3,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 2,
    y: 4,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 7,
    y: 4,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
]

const door = {
  x: 9,
  y: 0,
  direction: DIRECTION_ENUM.BOTTOM,
  state: PLAYER_STATE.IDLE,
  type: ENEMY_TYPE_ENUM.DOOR
}

const level20 = {
  mapInfo,
  player,
  enemies,
  spikes,
  bursts,
  door
}

export {
  level20
}
