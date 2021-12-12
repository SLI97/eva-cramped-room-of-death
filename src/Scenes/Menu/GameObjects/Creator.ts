import { GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';

const Creator = () => {
  const go = new GameObject('creator', {
    position: {
      x: 0,
      y: -20,
    },
    origin: {
      x: 0.5,
      y: 1,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  });

  go.addComponent(
    new Text({
      text: 'Created By Sli97',
      style: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: 'bold',
        align: 'center',
        fill: ['#aaa'], // gradient
      },
    }),
  );

  return go;
};

export default Creator;
