const INITIAL_USER_STATE = {
    userid: "",
    role: "",
    authorized: false, 
};

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}

const userReducer = (state = INITIAL_USER_STATE, action) => {
    switch(action.type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER: 
            return {
                ...state,
                userid: action.payload,
                authorized: true
            }

        default:
            return state;
    }
}

export default userReducer;