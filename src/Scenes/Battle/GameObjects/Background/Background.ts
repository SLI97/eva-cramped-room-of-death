import { GameObject } from '@eva/eva.js';
import BackgroundManager from './BackgroundManager';

const Background = () => {
  const go = new GameObject('background');

  go.addComponent(new BackgroundManager());

  return go;
};

export default Background;
