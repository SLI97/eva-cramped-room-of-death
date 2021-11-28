import { GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';

const Tips = () => {
  const go = new GameObject('tips', {
    position: {
      x: 0,
      y: 130,
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
      text: '（Tap Any Where To Start）',
      style: {
        fontFamily: 'Arial',
        fontSize: 18,
        fontWeight: 'bold',
        align: 'center',
        fill: ['#ccc'], // gradient
      },
    }),
  );

  return go;
};

export default Tips;
