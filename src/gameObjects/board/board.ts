import createBackboard from './backboard';
import createBasketBack from './basketBack';
import { GameObject } from '@eva/eva.js';


export default function createBoard() {
  const board = new GameObject('boardContainer', {
    size: {
      width: 750,
      height: 1484,
    }
  });
  const boardContainer = new GameObject('boardContainer', {
    position: {
      x: 0,
      y: -920,
    },
    anchor: {
      x: 0,
      y: 1,
    },
  });

  const backContainer = new GameObject('boardContainer', {
    position: {
      x: 0,
      y: -920,
    },
    anchor: {
      x: 0,
      y: 1,
    },
  });

  boardContainer.addChild(createBackboard());
  backContainer.addChild(createBasketBack());

  board.addChild(backContainer);
  board.addChild(boardContainer)
  return board;
}
