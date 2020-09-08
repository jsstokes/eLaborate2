const INITIAL_USER_STATE = {
    userid: "testuser@mongodb.com",
    role: "",
    authorized: false, 
    studentEmail: ""
};

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
    SET_STUDENT_EMAIL: "SET_STUDENT_EMAIL"
}

const userReducer = (state = INITIAL_USER_STATE, action) => {
    switch(action.type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER: 
            return {
                ...state,
                userid: action.payload,
                authorized: true
            }
        case USER_ACTION_TYPES.SET_STUDENT_EMAIL:
            return {
                ...state,
                studentEmail: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;