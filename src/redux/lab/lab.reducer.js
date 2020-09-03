const INITIAL_LAB_STATE = {
    currentLab: null,
    currentLabID: null,
    currentStep: 0,
    labView: "Details",
    labList: null,
}

export const LAB_ACTION_TYPES = {
    SET_CURRENT_LAB: "SET_CURRENT_LAB",
    SET_CURRENT_LAB_ID: "SET_CURRENT_LAB_ID",
    SET_CURRENT_STEP: "SET_CURRENT_STEP",
    DELETE_CURRENT_STEP: "DELETE_CURRENT_STEP",
    SET_LAB_VIEW: "SET_LAB_VIEW",
    SET_LAB_LIST: "SET_LAB_LIST",
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
        case LAB_ACTION_TYPES.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.payload
            }
        case LAB_ACTION_TYPES.DELETE_CURRENT_STEP: 
            console.log("About to Delete Lab Step - state: ", state);
            let newLab = state.currentLab;
            newLab.steps.splice(state.currentStep, 1);
            let newCurrentStep = 0
            if (state.currentStep > (state.currentLab.steps.length -1)) {
                newCurrentStep = state.currentLab.steps.length - 1;
            } else {
                newCurrentStep = state.currentStep;
            }
            return {
                ...state,
                currentLab: newLab,
                currentStep: newCurrentStep
            };

        case LAB_ACTION_TYPES.SET_LAB_VIEW: 
            return {
                ...state,
                labView: action.payload
            }
            
        case LAB_ACTION_TYPES.SET_LAB_LIST:
            return {
                ...state,
                labList: action.payload
            }
        
        default:
            return state;
    }
}

export default labReducer;