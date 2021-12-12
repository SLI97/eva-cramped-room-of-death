import { GameObject } from '@eva/eva.js';
import { IEnemy } from '../../../../Levels';
import WoodenSkeletonManager from './Scripts/WoodenSkeletonManager';

const PLAYER_WIDTH = 128;
const PLAYER_HEIGHT = 128;

const WoodenSkeleton = (enemy: IEnemy) => {
    const go = new GameObject('woodenSkeleton', {
        size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
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

    go.addComponent(new WoodenSkeletonManager(enemy));

    return go;
};

export default WoodenSkeleton;
