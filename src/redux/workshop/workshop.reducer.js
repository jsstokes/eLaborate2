const INITIAL_WORKSHOP_STATE = {
    name: "",
    description: "",
    customer: "",
    startDate: new Date(),
    workshopList: null,
}
export const WORKSHOP_ACTION_TYPES = {
    SET_CURRENT_WORKSHOP: "SET_CURRENT_WORKSHOP",
    SET_WORKSHOP_LIST: "SET_WORKSHOP_LIST",
}

const workshopReducer = (state = INITIAL_WORKSHOP_STATE, action) => {
    switch(action.type){
        case WORKSHOP_ACTION_TYPES.SET_CURRENT_WORKSHOP:
            return {
                ...state,
                currentWorkshop: action.payload
            }
            case WORKSHOP_ACTION_TYPES.SET_WORKSHOP_LIST:
                return {
                    ...state,
                    workshopList: action.payload
                }
            default:
                return state;
    }
}

export default workshopReducer;