import { GameObject } from '@eva/eva.js';
import SmokeManager from './Scripts/SmokeManager';
import { ISmoke } from '../../../../Levels';

const SMOKE_WIDTH = 128;
const SMOKE_HEIGHT = 128;

const Smoke = (smoke: ISmoke) => {
  const go = new GameObject('smoke', {
    size: { width: SMOKE_WIDTH, height: SMOKE_HEIGHT },
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

  go.addComponent(new SmokeManager(smoke));

  return go;
};

export default Smoke;
