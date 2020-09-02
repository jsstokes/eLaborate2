const INITIAL_LAB_STATE = {
    currentLab: null,
    currentLabID: null
}

export const LAB_ACTION_TYPES = {
    SET_CURRENT_LAB: "SET_CURRENT_LAB",
    SET_CURRENT_LAB_ID: "SET_CURRENT_LAB_ID"
}

const labReducer = (state = INITIAL_LAB_STATE, action) => {
    switch(action.type) {
        case LAB_ACTION_TYPES.SET_CURRENT_LAB:
            return {
                ...state,
                currentLab: action.payload
            }
        case LAB_ACTION_TYPES.SET_CURRENT_LAB_ID:
            return {
                ...state,
                currentLabID: action.payload
            }
        
        default:
            return state;
    }
}

export default labReducer;