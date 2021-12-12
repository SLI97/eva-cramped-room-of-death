import { GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';

const Title = () => {
  const go = new GameObject('title', {
    position: {
      x: 0,
      y: 70,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 0.5,
    },
  });

  go.addComponent(
    new Text({
      text: 'Cramped Room of Death',
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        align: 'center',
        wordWrapWidth: 300,
        lineHeight: 46,
        wordWrap: true,
        fill: ['#eeaa44'], // gradient
      },
    }),
  );

  return go;
};

export default Title;
