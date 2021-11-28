import { GameObject } from '@eva/eva.js';
import PlayerManager from './Scripts/PlayerManager';
import { IPlayer } from '../../../../Levels';
import PlayerStateMachine from './Scripts/PlayerStateMachine';

const PLAYER_WIDTH = 128;
const PLAYER_HEIGHT = 128;

const Player = (player: IPlayer) => {
  const go = new GameObject('player', {
    size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
    position: {
      x: 0,
      y: 0,
    },
    origin: {
      x: 0,
      y: 0,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  });

    go.addComponent(new PlayerManager(player));

  return go;
};

export default Player;
