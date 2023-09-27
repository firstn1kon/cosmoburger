import profileWSReducer,
     {  initWS,
        closeWS,
        openWS,
        errorWS,
        messageWS,
        handleClose, 
        initialState } from "./profile-slice"

describe("Profile Slice reducers", () => {
    it("should return the initial state", () => {
        const result = profileWSReducer(undefined, {type: ""});
        expect(result).toEqual(initialState);
    })
    // Common reducers
    it("should init websocket profile with 'initWS' action", () => {
        const url = "wss://test.test"
        const expectedState = {...initialState, status: 'init', url}
        const action = {type: initWS.type, payload: url}
        const result = profileWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should change status to close websocket profile with 'closeWS' action", () => {
        const expectedState = {...initialState, status: 'closed'}
        const action = {type: closeWS.type}
        const result = profileWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should change status to online websocket profile with 'openWS' action", () => {
        const expectedState = {...initialState, status: 'online'}
        const action = {type: openWS.type}
        const result = profileWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should change status to error and write error code websocket profile with 'errorWS' action", () => {
        const error = '1016'
        const expectedState = {...initialState, status: 'error', error}
        const action = {type: errorWS.type, payload: error}
        const result = profileWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should put message from server to property data websocket profile with 'messageWS' action", () => {
        const mockData = {
            success: true,
            orders: [{order: 1}, {order: 2}],
            total: 56,
            totalToday: 2
        }
        const expectedState = {...initialState, data: mockData}
        const action = {type: messageWS.type, payload: mockData}
        const result = profileWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })
    it("should change status to normal closure code websocket profile with 'handleClose' action", () => {
        const normalClosureCode = '1000'
        const expectedState = {...initialState, status: normalClosureCode}
        const action = {type: handleClose.type, payload: normalClosureCode}
        const result = profileWSReducer(initialState, action)
        expect(result).toEqual(expectedState);
    })

})

