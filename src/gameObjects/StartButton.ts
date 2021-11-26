import { GameObject, Scene } from '@eva/eva.js';
import { Physics } from '@eva/plugin-matterjs';
import { Img } from '@eva/plugin-renderer-img';
import { Event } from '@eva/plugin-renderer-event';
import { GAME_SIZE } from '../CONST';
import Laser from './laser';
import { Sound } from '@eva/plugin-sound';
const AttackBtn = () => {
    const btn = new GameObject('AttackBtn', {
        size: { width: 300, height: 300 },
        origin: { x: 0.5, y: 0.5 },
        scale: { x: 0.5, y: 0.5 },
        position: {
            x: GAME_SIZE.WIDTH / 2,
            y: GAME_SIZE.HEIGHT - 100,
        },
        anchor: {
            x: 0,
            y: 0,
        },
    });

    btn.addComponent(
        new Img({
            resource: 'attack',
        })
    );

    const evt = btn.addComponent(new Event());

    evt.on('tap', (e) => {
        console.log('AttackBtn');
        try {
            const scene: Scene = btn.scene;
            const player: GameObject = scene.gameObjects.find((item) => {
                return item.name == 'player';
            });
            const { x, y } = player.getComponent(Physics).body.position;
            const { angle } = player.getComponent(Physics).body;
            scene.addChild(Laser(x, y, angle));
            const attackSoundObj = new GameObject('sound');
            const attackSound = attackSoundObj.addComponent(
                new Sound({ resource: 'attackSound', loop: false, autoplay: true, volume: 1 })
            );
            attackSound.play();
            console.log(player);
        } catch (error) {}
    });
    return btn;
};
export default AttackBtn;
