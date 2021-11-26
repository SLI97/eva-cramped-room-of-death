import { GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';

const Title = new GameObject('score', {
    position: {
        x: 60,
        y: 60,
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

Title.addComponent(
    new Text({
        text: 'Cramped Room of Death',
        style: {
            fontFamily: 'Arial',
            fontSize: 80,
            fontWeight: 'bold',
            fill: ['#fff'], // gradient
        },
    })
);

export default Title;
