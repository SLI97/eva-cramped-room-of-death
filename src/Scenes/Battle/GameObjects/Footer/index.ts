import { GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;

const Footer = () => {
    const go = new GameObject('footer', {
        position: {
            x: 0,
            y: -16,
        },
        origin: {
            x: 0.5,
            y:1,
        },
        anchor: {
            x: 0.5,
            y: 1,
        },
    });

    go.addComponent(
        new Text({
            text: 'Cramped Room of Death Demo',
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fontWeight: 'bold',
                align: 'center',
                fill: ['#ccc'], // gradient
            },
        }),
    );

    return go;
};

export default Footer;
