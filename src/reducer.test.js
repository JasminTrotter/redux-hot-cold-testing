import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE} from './actions';
import {restartGame, makeGuess, generateAuralUpdate} from './actions';
import reducer from './reducer';

//REDUCER TEST
describe('reducer', () => {

	it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.auralStatus).toEqual("");
        expect(state.feedback).toEqual("Make your guess!");
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

	describe('restartGame', () => {
		it('should restart the game', () => {
			let state;
			state = reducer(state, restartGame());
			expect(state.guesses).toEqual([]);
	        expect(state.auralStatus).toEqual("");
	        expect(state.feedback).toEqual("Make your guess!");
		});
	});

	describe('makeGuess', () => {
		it('should add new guess to array', () => {
			let state = {
				guesses: [1, 60, 99]
			};
			let guess = 10;
			state = reducer(state, makeGuess(guess));
			expect(state.guesses).toEqual([1, 60, 99, 10]);
		});	
		it('should give correct feedback', () => {
			let state = {
				correctAnswer: 2,
				guesses: []
			};
			state = reducer(state, makeGuess(2));
			expect(state.feedback).toEqual("You got it!");
			state = reducer(state, makeGuess(3));
			expect(state.feedback).toEqual("You're Hot!");
			state = reducer(state, makeGuess(13));
			expect(state.feedback).toEqual("You're Warm.");
			state = reducer(state, makeGuess(33));
			expect(state.feedback).toEqual("You're Cold...");
			state = reducer(state, makeGuess(53));
			expect(state.feedback).toEqual("You're Ice Cold...");
		});
	});

	describe('generateAuralUpdate', () => {
		it('should return the correct aural status', () => {
			let state = {
				guesses: [],
				feedback: 'Make your guess!'
			}
			state = reducer(state, generateAuralUpdate())
			expect(state.auralStatus).toEqual("Here's the status of the game right now: Make your guess! You've made 0 guesses.");
			state = {
				guesses: [2],
				feedback: "You're Cold..."
			}
			state = reducer(state, generateAuralUpdate())
			expect(state.auralStatus).toEqual("Here's the status of the game right now: You're Cold... You've made 1 guess. It was: 2");
			state = {
				guesses: [2, 60],
				feedback: "You're Warm."
			}
			state = reducer(state, generateAuralUpdate())
			expect(state.auralStatus).toEqual("Here's the status of the game right now: You're Warm. You've made 2 guesses. In order of most- to least-recent, they are: 60, 2");
		});
	});
});

