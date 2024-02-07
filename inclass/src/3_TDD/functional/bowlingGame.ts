/* Remember that all your functions have to respect the functional programming rules:
 *  - 🔥 Pure functions and side effects 
 *  - 🔥 First class functions & higher order functions
 *  - 🔥 Immutability ⚠️
 *  - 🔥 Composition 
 *
 * See more info here: 
 * https://www.learningjournal.guru/courses/scala/scala-programming-foundation/elements-of-functional-programming-1/
 * 
 * I'm putting a warning in Immutability to remember you that every time you try
 * to change the state var... just be carefull...⚠️
 */

  // Patricio A. Peña Ojeda

  type State = { rolls: number[] };

  const inState: State = { rolls: [] };
  const frm: number = 10;
  
  export const createBowlingGame = (state: State = inState) => {
    const roll = (pins: number) => rollHelper(state, pins);
    const getScore = () => calculateScore(state); 
    const resetState = () => createBowlingGame();
  
    const rollHelper = (state: State, pins: number) => {
      const rolls = [...state.rolls, pins];
      return createBowlingGame({ rolls });
    };
  
    const calculateScore = (state: State) => {
      let score = 0;
      let firstTry = 0;
  
      for (let frame = 0; frame < frm; frame++) {
        if (isStrike(state, firstTry)) {
          score += scoreForStrike(state, firstTry);
          firstTry++;
        } else if (isSpare(state, firstTry)) {
          score += scoreForSpare(state, firstTry);
          firstTry += 2;
        } else {
          score += state.rolls[firstTry] + state.rolls[firstTry + 1];
          firstTry += 2;
        }
      }
  
      return score;
    };

    const isSpare = (state: State, firstTry: number) =>
      state.rolls[firstTry] + state.rolls[firstTry + 1] === 10;
    const isStrike = (state: State, firstTry: number) =>
      state.rolls[firstTry] === 10;
  
    const scoreForSpare = (state: State, firstTry: number) =>
      10 + state.rolls[firstTry + 2];
    const scoreForStrike = (state: State, firstTry: number) =>
      10 + state.rolls[firstTry + 1] + state.rolls[firstTry + 2];
  
    return Object.freeze({
      roll,
      getScore,
      resetState,
    });
  };

  
