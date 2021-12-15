import { GameObject } from '@eva/eva.js';
import BackgroundManager from './BackgroundManager';
import { getInitPosition } from '../../../../Utils';

const Background = () => {
  const go = new GameObject('background', {
   ...getInitPosition(),
  });

  go.addComponent(new BackgroundManager());

  return go;
};

export default Background;
