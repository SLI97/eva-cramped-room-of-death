import { GameObject } from '@eva/eva.js';
import { IEntity } from '../../../../Levels';
import DoorManager from './Scripts/DoorManager';
import { Render } from '@eva/plugin-renderer-render';

export const DOOR_WIDTH = 128;
export const DOOR_HEIGHT = 128;

const Door = (door: IEntity) => {
  const go = new GameObject('door', {
    size: { width: DOOR_WIDTH, height: DOOR_HEIGHT },
  });

  go.addComponent(new Render());
  go.addComponent(new DoorManager(door));

  return go;
};

export default Door;
