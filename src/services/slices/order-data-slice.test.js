import orderDataReducer, { initialState, orderDataFetch } from "./order-data-slice"
import { mockPersonalOrder } from "../mocks/personal-order";
import { getOrderData } from "../../utils/api";

describe("Order data Slice reducers", () => {
    it("should return the initial state", () => {
        const result = orderDataReducer(undefined, {type: ""});
        expect(result).toEqual(initialState);
    })
    // Extrareducers
    it("should swap isLoading and isError with 'orderDataFetch.pending' action", () => {
        const result = orderDataReducer({...initialState, isError: true}, orderDataFetch.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading and isError with 'orderDataFetch.rejected' action", () => {
        const result = orderDataReducer({...initialState, isLoading: true}, orderDataFetch.rejected('coud not fetch'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('coud not fetch')
    })
    it("should fill property state 'orders' mocked data witch 'orderDataFetch.fulfilled' action", () => {
        const result = orderDataReducer({...initialState, isLoading: true}, orderDataFetch.fulfilled(mockPersonalOrder))
        expect(result.isLoading).toBe(false)
        expect(result.orders).toBe(mockPersonalOrder)
    })
    it("should fill orders property state empty [] witch 'orderDataFetch.fulfilled' action", () => {
        const result = orderDataReducer({...initialState, isLoading: true}, orderDataFetch.fulfilled([mockPersonalOrder[0], mockPersonalOrder[0]]))
        expect(result.isLoading).toBe(false)
        expect(result.orders).toHaveLength(0)
    })
})

// Thunks
describe("Order data slice thunks", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(getOrderData);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "orderDataFetch"', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({orders: mockPersonalOrder, success: true})
        })
        const dispatch = jest.fn();
        const thunk = orderDataFetch()
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(orderDataFetch.pending().type)
        expect(fulfilled.type).toBe(orderDataFetch.fulfilled().type)
        expect(fulfilled.payload).toBe(mockPersonalOrder)
    })

    it('should fetch with reject response 404 with "orderDataFetch"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/orders/12345, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = orderDataFetch("12345")
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(orderDataFetch.pending().type)
        expect(rejected.type).toBe(orderDataFetch.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})