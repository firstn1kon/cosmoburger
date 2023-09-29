import userReducer, { 
    initialState,
    resetTransfer,
    checkAuth, 
    resetError,   
    registerUser, 
    loginUser, 
    fogotPassword, 
    resetPassword, 
    fetchUser, 
    updateUser, 
    logoutUser } from "./user-slice"
import { mockUser, mockError, mockErrorGetUser, mockUserGetOrUpdate, mockLogoutUser } from "../mocks/user-data";
import { postRegisterUser, postFogotPassword, postResetPassword, getUser, patchUser, postLogoutUser } from "../../utils/api";


describe("User Slice reducers", () => {

    it("should return the initial state", () => {
        const result = userReducer(undefined, {type: ""});
        expect(result).toEqual(initialState);
    })
    // Common reducers
    it("should set 'transfer' to false with 'resetTransfer' action", () => {
        const action = {type: resetTransfer.type}
        const result = userReducer({...initialState, transfer: true}, action)
        expect(result).toEqual(initialState);
    })
    it("should set 'isCkechedAuth' to true with 'checkAuth' action", () => {
        const action = {type: checkAuth.type}
        const result = userReducer(initialState, action)
        expect(result.isCkechedAuth).toBe(true);
    })
    it("should set 'isError' to false with 'resetError' action", () => {
        const action = {type: resetError.type}
        const result = userReducer({...initialState, isError: true}, action)
        expect(result.isCkechedAuth).toBe(false);
    })
    // Extrareducers
    it("should swap isLoading to true and isError to false with 'registerUser.pending' action", () => {
        const result = userReducer({...initialState, isError: true}, registerUser.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading to false and isError with 'registerUser.rejected' action", () => {
        const result = userReducer({...initialState, isLoading: true}, registerUser.rejected('user already exist'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('user already exist')
    })
    it("should fill property state 'user' mocked data, swap 'isLoading' and swap 'isCkechedAuth' witch 'registerUser.fulfilled' action", () => {
        const result = userReducer({...initialState, isLoading: true}, registerUser.fulfilled(mockUser))
        expect(result.isLoading).toBe(false)
        expect(result.isCkechedAuth).toBe(true)
        expect(result.user).toBe(mockUser)
    })
    it("should swap isLoading to true and isError to false with 'loginUser.pending' action", () => {
        const result = userReducer({...initialState, isError: true}, loginUser.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading to false and isError with 'loginUser.rejected' action", () => {
        const result = userReducer({...initialState, isLoading: true}, loginUser.rejected('login or password invalid'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('login or password invalid')
    })
    it("should fill property state 'user' mocked data, swap 'isLoading' and swap 'isCkechedAuth' witch 'loginUser.fulfilled' action", () => {
        const result = userReducer({...initialState, isLoading: true}, loginUser.fulfilled(mockUser))
        expect(result.isLoading).toBe(false)
        expect(result.isCkechedAuth).toBe(true)
        expect(result.user).toBe(mockUser)
    })
    it("should swap isLoading to true and isError to false with 'fogotPassword.pending' action", () => {
        const result = userReducer({...initialState, isError: true}, fogotPassword.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading to false and isError with 'fogotPassword.rejected' action", () => {
        const result = userReducer({...initialState, isLoading: true}, fogotPassword.rejected('login does not exist'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('login does not exist')
    })
    it("should set 'transfer' to true witch 'fogotPassword.fulfilled' action", () => {
        const result = userReducer({...initialState, isLoading: true}, fogotPassword.fulfilled())
        expect(result.isLoading).toBe(false)
        expect(result.transfer).toBe(true)
    })
    it("should swap isLoading to true and isError to false with 'resetPassword.pending' action", () => {
        const result = userReducer({...initialState, isError: true}, resetPassword.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading to false and isError with 'resetPassword.rejected' action", () => {
        const result = userReducer({...initialState, isLoading: true}, resetPassword.rejected('invalid reset token'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('invalid reset token')
    })
    it("should set 'transfer' to false witch 'resetPassword.fulfilled' action", () => {
        const result = userReducer({...initialState, isLoading: true, transfer: true}, resetPassword.fulfilled())
        expect(result.isLoading).toBe(false)
        expect(result.transfer).toBe(false)
    })
    it("should swap isLoading to true and isError to false with 'fetchUser.pending' action", () => {
        const result = userReducer({...initialState, isError: true}, fetchUser.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading to false and isError, isCkechedAuth with 'fetchUser.rejected' action", () => {
        const result = userReducer({...initialState, isLoading: true}, fetchUser.rejected('error auth'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('error auth')
        expect(result.isCkechedAuth).toBe(true)
    })
    it("should fill property state 'user' mocked data, swap 'isLoading' and swap 'isCkechedAuth' witch 'fetchUser.fulfilled' action", () => {
        const result = userReducer({...initialState, isLoading: true}, fetchUser.fulfilled(mockUser))
        expect(result.isLoading).toBe(false)
        expect(result.isCkechedAuth).toBe(true)
        expect(result.user).toBe(mockUser)
    })
    it("should swap isLoading to true and isError to false with 'updateUser.pending' action", () => {
        const result = userReducer({...initialState, isError: true}, updateUser.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading to false and isError, isCkechedAuth with 'updateUser.rejected' action", () => {
        const result = userReducer({...initialState, isLoading: true}, updateUser.rejected('error update'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('error update')
    })
    it("should fill property state 'user' mocked data, swap 'isLoading' and swap 'isCkechedAuth' witch 'updateUser.fulfilled' action", () => {
        const result = userReducer({...initialState, isLoading: true}, updateUser.fulfilled(mockUser))
        expect(result.isLoading).toBe(false)
        expect(result.isCkechedAuth).toBe(true)
        expect(result.user).toBe(mockUser)
    })
    it("should swap isLoading to true and isError to false with 'logoutUser.pending' action", () => {
        const result = userReducer({...initialState, isError: true}, logoutUser.pending())
        expect(result.isLoading).toBe(true)
        expect(result.isError).toBe(false)
    })
    it("should swap isLoading to false and isError, isCkechedAuth with 'logoutUser.rejected' action", () => {
        const result = userReducer({...initialState, isLoading: true}, logoutUser.rejected('error logout'))
        expect(result.isLoading).toBe(false)
        expect(result.isError).toBe('error logout')
    })
    it("should fill property state 'user' mocked data, swap 'isLoading' and swap 'isCkechedAuth' witch 'logoutUser.fulfilled' action", () => {
        const result = userReducer({...initialState, isLoading: true, user: mockUser.user}, logoutUser.fulfilled())
        expect(result.isLoading).toBe(false)
        expect(result.isCkechedAuth).toBe(true)
        expect(result.user.email).toBe("")
        expect(result.user.name).toBe("")
    })
})

// Thunks
describe("User slice thunk registerUser", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(postRegisterUser);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "registerUser"', async () => {
        const arg = {
            "email": "test@test.ru",
            "password": "Test!233",
            "name": "Test"
        }
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockUser)
        })
        const dispatch = jest.fn();
        const thunk = registerUser(arg)
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(registerUser.pending().type)
        expect(pending.meta.arg).toBe(arg)
        expect(fulfilled.type).toBe(registerUser.fulfilled().type)
        expect(fulfilled.payload).toBe(mockUser.user)
    })

    it('should fetch with reject response 404 with "registerUser"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/auth/register, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = registerUser()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(registerUser.pending().type)
        expect(rejected.type).toBe(registerUser.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})

describe("User slice thunk loginUser", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(postRegisterUser);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "loginUser"', async () => {
        const arg = {
            "email": "test@test.ru",
            "password": "Test!233",
        }
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockUser)
        })
        const dispatch = jest.fn();
        const thunk = loginUser(arg)
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(loginUser.pending().type)
        expect(pending.meta.arg).toBe(arg)
        expect(fulfilled.type).toBe(loginUser.fulfilled().type)
        expect(fulfilled.payload).toBe(mockUser.user)
    })

    it('should fetch with reject response 404 with "loginUser"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/auth/login, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = loginUser()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(loginUser.pending().type)
        expect(rejected.type).toBe(loginUser.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
    it('should fetch with reject response 401 with "loginUser"', async () => {
        const errorMessage = 'email or password are incorrect'
        const arg = {
            "email": "test@test.ru",
            "password": "Test!233",
        }
        global.fetch.mockResolvedValue({
            ok: false,
            status: 401,
            json: () => Promise.resolve(mockError)
        })
        const dispatch = jest.fn();
        const thunk = loginUser(arg)
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(loginUser.pending().type)
        expect(pending.meta.arg).toBe(arg)
        expect(rejected.type).toBe(loginUser.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})

describe("User slice thunk fogotPassword", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(postFogotPassword);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "fogotPassword"', async () => {
        const arg = {
            "email": mockUser.user.email
        }
        const mockResponse = {"success": true,"message": "Reset email sent"}
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        })
        const dispatch = jest.fn();
        const thunk = fogotPassword(arg)
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(fogotPassword.pending().type)
        expect(pending.meta.arg).toBe(arg)
        expect(fulfilled.type).toBe(fogotPassword.fulfilled().type)
        expect(fulfilled.payload).toBe(mockResponse)
    })

    it('should fetch with reject response 404 with "fogotPassword"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/password-reset, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = fogotPassword()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(fogotPassword.pending().type)
        expect(rejected.type).toBe(fogotPassword.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})
describe("User slice thunk resetPassword", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(postResetPassword);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "resetPassword"', async () => {
        const arg = {
            "password": "Pa$$W0RD",
            "token": "324y-324dfs-3424ds-34234"
        }
        const mockResponse = {"success": true,"message": "Password reset"}
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        })
        const dispatch = jest.fn();
        const thunk = resetPassword(arg)
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(resetPassword.pending().type)
        expect(pending.meta.arg).toBe(arg)
        expect(fulfilled.type).toBe(resetPassword.fulfilled().type)
        expect(fulfilled.payload).toBe(mockResponse)
    })

    it('should fetch with reject response 404 with "resetPassword"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/password-reset/reset, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = resetPassword()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(resetPassword.pending().type)
        expect(rejected.type).toBe(resetPassword.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})

describe("User slice thunk fetchUser", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(getUser);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "fetchUser"', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockUserGetOrUpdate)
        })
        const dispatch = jest.fn();
        const thunk = fetchUser()
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(fetchUser.pending().type)
        expect(fulfilled.type).toBe(fetchUser.fulfilled().type)
        expect(fulfilled.payload).toBe(mockUserGetOrUpdate.user)
    })

    it('should fetch with reject response 404 with "fetchUser"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/auth/user, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = fetchUser()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(fetchUser.pending().type)
        expect(rejected.type).toBe(fetchUser.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
    it('should fetch with reject response 401 with "fetchUser"', async () => {
        const errorMessage = 'You should be authorised'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 401,
            json: () => Promise.resolve(mockErrorGetUser)
        })
        const dispatch = jest.fn();
        const thunk = fetchUser()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(fetchUser.pending().type)
        expect(rejected.type).toBe(fetchUser.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})

describe("User slice thunk updateUser", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(patchUser);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "updateUser"', async () => {
        const arg = {
            "name": "Name",
        }
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockUserGetOrUpdate)
        })
        const dispatch = jest.fn();
        const thunk = updateUser(arg)
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(updateUser.pending().type)
        expect(pending.meta.arg).toBe(arg)
        expect(fulfilled.type).toBe(updateUser.fulfilled().type)
        expect(fulfilled.payload).toBe(mockUserGetOrUpdate.user)
    })

    it('should fetch with reject response 404 with "updateUser"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/auth/user, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = updateUser()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(updateUser.pending().type)
        expect(rejected.type).toBe(updateUser.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})

describe("User slice thunk logoutUser", () => {
    let originalFetch;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(postLogoutUser);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    
    it('should fetch with resolved response with "logoutUser"', async () => {
        const arg = {
            "token": "asdahs-ashd@sh-231d",
        }
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockLogoutUser)
        })
        const dispatch = jest.fn();
        const thunk = logoutUser(arg)
        await thunk(dispatch)
        const [[pending], [fulfilled]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(logoutUser.pending().type)
        expect(pending.meta.arg).toBe(arg)
        expect(fulfilled.type).toBe(logoutUser.fulfilled().type)
        expect(fulfilled.payload).toBe(mockLogoutUser)
    })

    it('should fetch with reject response 404 with "logoutUser"', async () => {
        const errorMessage = 'https://norma.nomoreparties.space/api/auth/logout, status: 404'
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        })
        const dispatch = jest.fn();
        const thunk = logoutUser()
        await thunk(dispatch)
        const [[pending], [rejected]] = dispatch.mock.calls
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(pending.type).toBe(logoutUser.pending().type)
        expect(rejected.type).toBe(logoutUser.rejected().type)
        expect(rejected.error.message).toBe(errorMessage)
    })
})

