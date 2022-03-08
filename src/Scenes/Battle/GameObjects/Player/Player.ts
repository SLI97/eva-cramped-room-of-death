import { GameObject } from '@eva/eva.js';
import PlayerManager from './Scripts/PlayerManager';
import { IEntity } from '../../../../Levels';
import { ENTITY_HEIGHT, ENTITY_WIDTH } from '../../../../Base/EntityManager';
import { Render } from '@eva/plugin-renderer-render';

const Player = (player: IEntity) => {
  const go = new GameObject('player', {
    size: { width: ENTITY_WIDTH, height: ENTITY_HEIGHT },
  });

  go.addComponent(
    new Render({
      zIndex: 2,
    }),
  );
  go.addComponent(new PlayerManager(player));

  return go;
};

export default Player;
