import { GameObject } from '@eva/eva.js';
import PlayerManager from './Scripts/PlayerManager';
import { IPlayer } from '../../../../Levels';

export const PLAYER_WIDTH = 128;
export const PLAYER_HEIGHT = 128;

const Player = (player: IPlayer) => {
  const go = new GameObject('player', {
    size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
  });

  go.addComponent(new PlayerManager(player));

  return go;
};

export default Player;
