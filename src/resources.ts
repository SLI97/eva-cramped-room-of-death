import { RESOURCE_TYPE } from '@eva/eva.js';
export default [
  {
    name: 'basketball',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: './statics/TB1WF1R0Ez1gK0jSZLeXXb9kVXa-99-99.png',
      },
    },
    preload: true,
  },
  {
    name: 'backboard',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          './statics/TB1a11YoRFR4u4jSZFPXXanzFXa-109-263.png',
      },
    },
    preload: true,
  },
  {
    name: 'bg',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          './statics/TB15Upxqk9l0K4jSZFKXXXFjpXa-750-1624.jpg',
      },
    },
    preload: true,
  },
  {
    name: 'basketBack',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          './statics/TB1Xerd0AY2gK0jSZFgXXc5OFXa-184-175.png',
      },
    },
    preload: true,
  },
  {
    name: 'boardIdle',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
      image: {
        type: 'png',
        url:
          './statics/TB1LYwonSR26e4jSZFEXXbwuXXa-920-875.png',
      },
      json: {
        type: 'json',
        url:
          './statics/3246284841596d87b60749e88e0e26cd.json',
      },
    },
    preload: true,
  },
  {
    name: 'boardGoal',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
      image: {
        type: 'png',
        url:
          './statics/TB1ob_c0EY1gK0jSZFCXXcwqXXa-552-525.png',
      },
      json: {
        type: 'json',
        url:
          './statics/dfefdd86474cded44bdc226549ae6d81.json',
      },
    },
    preload: true,
  },
];
