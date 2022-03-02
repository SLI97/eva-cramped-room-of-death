import { GameObject } from '@eva/eva.js';
import SmokeManager from './Scripts/SmokeManager';
import { IEntity } from '../../../../Levels';
import { Render } from '@eva/plugin-renderer-render';

const SMOKE_WIDTH = 128;
const SMOKE_HEIGHT = 128;

const Smoke = (smoke: IEntity) => {
  const go = new GameObject('smoke', {
    size: { width: SMOKE_WIDTH, height: SMOKE_HEIGHT },
  });

  go.addComponent(new Render());
  go.addComponent(new SmokeManager(smoke));

  return go;
};

export default Smoke;
