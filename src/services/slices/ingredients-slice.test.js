import ingredientsReducer, { setCurrentTab, initialState, ingredientsFetch } from "./ingredients-slice"
import { mockBasicIngredients } from "../mocks/basicingredients";
import { getAllIngredients } from "../../utils/api";

describe("Ingredeints Slice reducers", () => {
    it("should return the initial state", () => {
        const result = ingredientsReducer(undefined, {type: ""});
        expect(result).toEqual(initialState);
    })
    // Common reducers
    it("should change currentTub with 'setCurrentTab' action", () => {
        const expectedState = {...initialState, currentTab: "main"}
        const action = {type: setCurrentTab.type, payload: "main"}
        const result = ingredientsReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    // Extrareducers
    it("should swap isLoading and isError with 'ingredientsFetch.pending' action", () => {
        const result = ingredientsReducer({...initialState, isError: true}, ingredientsFetch.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading and isError with 'ingredientsFetch.rejected' action", () => {
        const result = ingredientsReducer({...initialState, isLoading: true}, ingredientsFetch.rejected('coud not fetch'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('coud not fetch')
    })
    it("should fill ingredients witch 'ingredientsFetch.fulfilled' action", () => {
        const result = ingredientsReducer({...initialState, isLoading: true}, ingredientsFetch.fulfilled(mockBasicIngredients))
        expect(result.isLoading).toBe(false)
        expect(result.ingredients).toBe(mockBasicIngredients)
    })
})

// Thunks
describe("Ingredients slice thunks", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(getAllIngredients);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response', async () => {
        const data = mockBasicIngredients
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({data, success: true})
        })
        const dispatch = jest.fn();
        const thunk = ingredientsFetch()
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(ingredientsFetch.pending().type)
        expect(fulfilled.type).toBe(ingredientsFetch.fulfilled().type)
        expect(fulfilled.payload).toBe(data)
    })
    it('should fetch with reject response 404', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/ingredients, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = ingredientsFetch()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(ingredientsFetch.pending().type)
        expect(rejected.type).toBe(ingredientsFetch.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})