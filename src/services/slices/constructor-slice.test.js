import constructorReducer,
     {addToConstructor, deleteFromConstructor, sortInConstrucor, resetConstructor, initialState } from "./constructor-slice"
import { mockSaucesAndMains, mock2MainSort } from "../mocks/sauces-and-mains";
import { mockBasicIngredients } from "../mocks/basicingredients";
describe("Constructor Slice reducers", () => {
    it("should return the initial state", () => {
        const result = constructorReducer(undefined, {type: ""});
        expect(result).toEqual(initialState);
    })
    // Common reducers
    it("should delete ingredient from constructor with 'deleteFromConstructor' action", () => {
        const expectedState = {...initialState, saucesAndMains: mockSaucesAndMains.filter(item => item._uid !== "uid60666c42cc7b410027a1a9b5")}
        const action = {type: deleteFromConstructor.type, payload: "uid60666c42cc7b410027a1a9b5"}
        const result = constructorReducer({...initialState, saucesAndMains: mockSaucesAndMains}, action)
        expect(result).toEqual(expectedState);
        expect(result.saucesAndMains).toHaveLength(4)
    })
    it("should delete last ingredient from constructor with 'deleteFromConstructor' action and swap helper to true", () => {
        const expectedState = {...initialState, saucesAndMains: [], helper: true}
        const action = {type: deleteFromConstructor.type, payload: "uid60666c42cc7b410027a1a9b5"}
        const result = constructorReducer({...initialState, helper: false, saucesAndMains: [mockSaucesAndMains[0]]}, action)
        expect(result).toEqual(expectedState);
        expect(result.helper).toBe(true)
    })
    it("should reset constructor to initial state with 'resetConstructor'", () => {
        const expectedState = initialState
        const action = {type: resetConstructor.type}
        const result = constructorReducer({...initialState, helper: false, saucesAndMains: mockSaucesAndMains}, action)
        expect(result).toEqual(expectedState);
    })
    it("should sort ingredients in constructor with 'sortInConstrucor' action", () => {
        const expectedState = {...initialState, saucesAndMains: [mock2MainSort[1], mock2MainSort[0]]}
        const action = {type: sortInConstrucor.type, payload: {dragIndex: 1, hoverIndex: 0}}
        const result = constructorReducer({...initialState, saucesAndMains: mock2MainSort}, action)
        expect(result).toEqual(expectedState);
    })
    it("should add ingredient to sauces and mains in constructor and swap helper to false with 'addToConstructor' action", () => {
        const result = constructorReducer(initialState, addToConstructor(mockBasicIngredients[1]))
        expect(result.helper).toBe(false);
        expect(result.saucesAndMains).toHaveLength(1)
        expect(result.saucesAndMains[0]).toHaveProperty('_uid')
    })
    it("should add bun to bun property state in constructor and swap helper to false with 'addToConstructor' action", () => {
        const result = constructorReducer(initialState, addToConstructor(mockBasicIngredients[0]))
        expect(result.helper).toBe(false);
        expect(result.bun).toHaveProperty('_uid')
        expect(result.bun.type).toBe('bun')
        expect(result.isBunAdd).toBe(true)
    })
})

