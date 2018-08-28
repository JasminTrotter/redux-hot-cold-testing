
import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE} from './actions';
import {restartGame, makeGuess, generateAuralUpdate} from './actions';

//ACTION TESTS
describe('generateAuralUpdate', () => {
	it('should return the action', () => {
		const action = generateAuralUpdate();
		expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
	});
});

describe('makeGuess', () => {
	it('should return the action', () => {
		const guess = 5;
		const action = makeGuess(guess);
		expect(action.type).toEqual(MAKE_GUESS);
		expect(action.guess).toEqual(guess);
	});
});

describe('restartGame', () => {
	it('should return the action', () => {
		const action = restartGame();
		expect(action.type).toEqual(RESTART_GAME);
	});
});