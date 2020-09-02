const INITIAL_LAB_STATE = {
    currentLab: null
}

export const LAB_ACTION_TYPES = {
    SET_CURRENT_LAB: "SET_CURRENT_LAB"
}

const labReducer = (state = INITIAL_LAB_STATE, action) => {
    switch(action.type) {
        case LAB_ACTION_TYPES.SET_CURRENT_LAB:
            return {
                ...state,
                currentLab: action.payload
            }
        
        default:
            return state;
    }
}

export default labReducer;