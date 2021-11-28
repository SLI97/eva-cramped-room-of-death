import { GameObject } from '@eva/eva.js';
import BackgroundManager from './BackgroundManager';

const Background = () => {
  const go = new GameObject('background', {
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

  go.addComponent(new BackgroundManager());

  return go;
};

export default Background;
