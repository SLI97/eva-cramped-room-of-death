import { GameObject } from '@eva/eva.js';
import { IDoor } from '../../../../Levels';
import DoorManager from './Scripts/DoorManager';

export const DOOR_WIDTH = 128;
export const DOOR_HEIGHT = 128;

const Door = (door: IDoor) => {
  const go = new GameObject('door', {
    size: { width: DOOR_WIDTH, height: DOOR_HEIGHT },
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

  go.addComponent(new DoorManager(door));

  return go;
};

export default Door;
