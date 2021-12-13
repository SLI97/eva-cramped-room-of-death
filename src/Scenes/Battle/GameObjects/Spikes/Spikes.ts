import { GameObject } from '@eva/eva.js';
import { ISpikes } from '../../../../Levels';
import SpikesManager from './Scripts/SpikesManager';

export const SPIKES_WIDTH = 128;
export const SPIKES_HEIGHT = 128;

const Spikes = (spikes: ISpikes) => {
  const go = new GameObject('spikes', {
    size: { width: SPIKES_WIDTH, height: SPIKES_HEIGHT },
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

  go.addComponent(new SpikesManager(spikes));

  return go;
};

export default Spikes;
