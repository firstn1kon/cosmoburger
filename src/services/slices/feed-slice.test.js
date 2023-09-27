import feedWSReducer,
     {  initWS,
        closeWS,
        openWS,
        errorWS,
        messageWS,
        handleClose, 
        initialState } from "./feed-slice"

describe("Feed Slice reducers", () => {
    it("should return the initial state", () => {
        const result = feedWSReducer(undefined, {type: ""});
        expect(result).toEqual(initialState);
    })
    // Common reducers
    it("should init websocket feed with 'initWS' action", () => {
        const url = "wss://test.test"
        const expectedState = {...initialState, status: 'init', url}
        const action = {type: initWS.type, payload: url}
        const result = feedWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should change status to close websocket feed with 'closeWS' action", () => {
        const expectedState = {...initialState, status: 'closed'}
        const action = {type: closeWS.type}
        const result = feedWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should change status to online websocket feed with 'openWS' action", () => {
        const expectedState = {...initialState, status: 'online'}
        const action = {type: openWS.type}
        const result = feedWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should change status to error and write error code websocket feed with 'errorWS' action", () => {
        const error = '1016'
        const expectedState = {...initialState, status: 'error', error}
        const action = {type: errorWS.type, payload: error}
        const result = feedWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should put message from server to property data websocket feed with 'messageWS' action", () => {
        const mockData = {
            succes: true,
            orders: [{order: 1}, {order: 2}],
            total: 56,
            totalToday: 2
        }
        const expectedState = {...initialState, data: mockData}
        const action = {type: messageWS.type, payload: mockData}
        const result = feedWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should change status to normal closure code websocket feed with 'handleClose' action", () => {
        const normalClosureCode = '1000'
        const expectedState = {...initialState, status: normalClosureCode}
        const action = {type: handleClose.type, payload: normalClosureCode}
        const result = feedWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })

})

