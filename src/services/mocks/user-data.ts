export const mockUser = {
    "success": true,
    "user": {
        "email": "test@test.ru",
        "name": "Test"
    },
    "accessToken": "Bearer ...",
    "refreshToken": "12345"
  }

export const mockUserGetOrUpdate = {
    "success": true,
    "user": {
        "email": "test@test.ru",
        "name": "Test"
    }
}

export const mockLogoutUser = {
    "success":true,
    "message":"Successful logout"
}

export const mockError = {
    "success":false,
    "message":"email or password are incorrect"
}

export const mockErrorGetUser = {
    "success":false,
    "message":"You should be authorised"
}

