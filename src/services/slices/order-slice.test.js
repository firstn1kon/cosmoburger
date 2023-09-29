import orderReducer, { initialState, sendOrder, openOrderModal, closeOrderModal, resetError } from "./order-slice"
import { postOrder } from "../../utils/api"

const mockData = {
    success: true,
    name: "Краторный бургер",
    order: {
        number: 364523
    }
}

describe("Order Slice reducers", () => {

    it("should return the initial state", () => {
        const result = orderReducer(undefined, {type: ""});
        expect(result).toEqual(initialState);
    })
    // Common reducers
    it("should set 'isOrderModalOpen' to true with 'openOrderModal' action", () => {
        const expectedState = {...initialState, isOrderModalOpen: true}
        const action = {type: openOrderModal.type}
        const result = orderReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should set 'isOrderModalOpen' to false and 'order number' to null with 'closeOrderModal' action", () => {

        const action = {type: closeOrderModal.type}
        const result = orderReducer({...initialState, data: mockData, isOrderModalOpen: true}, action)
        expect(result.isOrderModalOpen).toBe(false);
        expect(result.data.order.number).toBe(null);
    })
    it("should reset order slice to initial state with 'resetError'", () => {
        const action = {type: resetError.type}
        const result = orderReducer({...initialState, isOrderModalOpen: true, isError: true, data: mockData}, action)
        expect(result).toEqual(initialState);
    })
    // Extrareducers
    it("should swap isLoading to true and isError to false with 'sendOrder.pending' action", () => {
        const result = orderReducer({...initialState, isError: true}, sendOrder.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading to false and isError with 'sendOrder.rejected' action", () => {
        const result = orderReducer({...initialState, isLoading: true}, sendOrder.rejected('coud not fetch'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('coud not fetch')
    })
    it("should fill property state 'data' mocked data, swap 'isLoading' and swap 'isOrderModalOpen' witch 'sendOrder.fulfilled' action", () => {
        const result = orderReducer({...initialState, isLoading: true}, sendOrder.fulfilled(mockData))
        expect(result.isLoading).toBe(false)
        expect(result.isOrderModalOpen).toBe(true)
        expect(result.data).toBe(mockData)
    })

})

// Thunks
describe("Order slice thunks", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(postOrder);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "sendOrder"', async () => {
        const arg = '{"ingredients":["643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"]}'
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData)
        })
        const dispatch = jest.fn();
        const thunk = sendOrder(arg)
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(sendOrder.pending().type)
        expect(pending.meta.arg).toBe(arg)
        expect(fulfilled.type).toBe(sendOrder.fulfilled().type)
        expect(fulfilled.payload).toBe(mockData)
    })

    it('should fetch with reject response 404 with "sendOrder"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/orders, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = sendOrder()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(sendOrder.pending().type)
        expect(rejected.type).toBe(sendOrder.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})