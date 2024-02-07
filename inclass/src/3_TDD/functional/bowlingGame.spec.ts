//Necesario --> npm i --save-dev @types/jest

import { createBowlingGame } from "./bowlingGame";

describe('Test bowling game', () => {
  let game: ReturnType<typeof createBowlingGame>;

  beforeEach(() => {
    game = createBowlingGame().resetState();
  });
  
  it('should allow rolling a ball', () => {
    expect(game.roll(3)).toBeDefined();
  });

  it('Should roll a gutter game', () => {
    let rolls = 20;
    rollMany(rolls, game, 0); 
    expect(game.getScore()).toBe(0);
  });

  it('Should roll all ones', () => {
    let rolls = 20;
    rollMany(rolls, game, 1);
    expect(game.getScore()).toBe(20);
  });

  it('Should roll a spare', () => {
    rollSpare(game); 
    rollMany(17, game, 0); 
    expect(game.getScore()).toBe(16);
  });

  it('Should roll a strike', () => {
    rollStrike(game); 
    rollMany(17, game, 0); 
    expect(game.getScore()).toBe(22);
  });

  it('Should roll a perfect game', () => {
    rollMany(12, game, 10); 
    expect(game.getScore()).toBe(300);
  });
});


function rollMany(rolls: number, game: ReturnType<typeof createBowlingGame>, pins: number) {
  for (let i = 0; i < rolls; i++) {
    game = game.roll(pins);
  }
}

function rollStrike(game: ReturnType<typeof createBowlingGame>){
  game = game.roll(10);
  game = game.roll(3);
  game = game.roll(3);
  return game;
}

function rollSpare(game: ReturnType<typeof createBowlingGame>){
  game = game.roll(5);
  game = game.roll(5);
  game = game.roll(3);
  return game;
}

