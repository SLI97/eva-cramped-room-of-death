import { GameObject } from '@eva/eva.js';
import { IEntity } from '../../../../Levels';
import DoorManager from './Scripts/DoorManager';
import { Render } from '@eva/plugin-renderer-render';
import { ENTITY_HEIGHT, ENTITY_WIDTH } from '../Player/Player';

const Door = (door: IEntity) => {
  const go = new GameObject('door', {
    size: { width: ENTITY_WIDTH, height: ENTITY_HEIGHT },
  });

  go.addComponent(new Render());
  go.addComponent(new DoorManager(door));

  return go;
};

export default Door;
