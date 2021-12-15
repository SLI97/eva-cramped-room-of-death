import { GameObject } from '@eva/eva.js';
import { IDoor } from '../../../../Levels';
import DoorManager from './Scripts/DoorManager';
import { getInitPosition } from '../../../../Utils';

export const DOOR_WIDTH = 128;
export const DOOR_HEIGHT = 128;

const Door = (door: IDoor) => {
  const go = new GameObject('door', {
    size: { width: DOOR_WIDTH, height: DOOR_HEIGHT },
   ...getInitPosition(),
  });

  go.addComponent(new DoorManager(door));

  return go;
};

export default Door;
