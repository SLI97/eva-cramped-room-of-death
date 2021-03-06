import { GameObject } from '@eva/eva.js';
import { ISpikes } from '../../../../Levels';
import SpikesManager from './Scripts/SpikesManager';
import { Render } from '@eva/plugin-renderer-render';

export const SPIKES_WIDTH = 128;
export const SPIKES_HEIGHT = 128;

/***
 * 尖刺
 * @param spikes
 * @constructor
 */
const Spikes = (spikes: ISpikes) => {
  const go = new GameObject('spikes', {
    size: { width: SPIKES_WIDTH, height: SPIKES_HEIGHT },
  });

  go.addComponent(
    new Render({
      zIndex: 0,
    }),
  );
  go.addComponent(new SpikesManager(spikes));

  return go;
};

export default Spikes;
