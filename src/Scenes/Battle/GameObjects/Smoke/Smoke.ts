import { GameObject } from '@eva/eva.js';
import SmokeManager from './Scripts/SmokeManager';
import { ISmoke } from '../../../../Levels';
import { getInitPosition } from '../../../../Utils';

const SMOKE_WIDTH = 128;
const SMOKE_HEIGHT = 128;

const Smoke = (smoke: ISmoke) => {
  const go = new GameObject('smoke', {
    size: { width: SMOKE_WIDTH, height: SMOKE_HEIGHT },
    ...getInitPosition(),
  });

  go.addComponent(new SmokeManager(smoke));

  return go;
};

export default Smoke;
