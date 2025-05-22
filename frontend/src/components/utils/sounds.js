import { Howl } from 'howler';

export const bgMusic = new Howl({
  src: ['/sounds/bg.mp3'],
  volume: 0,
  loop: true,
  preload: true,
});

export const buttonSound = new Howl({
  src: ['/sounds/button.mp3'],
  volume: 0.5,
});

export const moveSound = new Howl({
  src: ['/sounds/move.mp3'],
  volume: 1,
})
