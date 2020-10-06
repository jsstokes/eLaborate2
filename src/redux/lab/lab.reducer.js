const INITIAL_LAB_STATE = {
    currentLab: null,
    currentStep: 0,
    currentLabID: null,
    labList: null,
    isEditing: false,
    labHasChanged: false,
}

export const LAB_ACTION_TYPES = {
    SET_CURRENT_LAB: "SET_CURRENT_LAB",
    SET_CURRENT_LAB_ID: "SET_CURRENT_LAB_ID",
    SET_CURRENT_STEP: "SET_CURRENT_STEP",
    DELETE_CURRENT_STEP: "DELETE_CURRENT_STEP",
    SET_LAB_VIEW: "SET_LAB_VIEW",
    SET_LAB_LIST: "SET_LAB_LIST",
    TOGGLE_LAB_IS_EDITING: "TOGGLE_LAB_IS_EDITING",
    SET_LAB_HAS_CHANGED: "SET_LAB_HAS_CHANGED" 
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
        
        case LAB_ACTION_TYPES.TOGGLE_LAB_IS_EDITING:
            return {
                ...state,
                isEditing: !state.isEditing
            }
        
        case LAB_ACTION_TYPES.SET_LAB_HAS_CHANGED:
            return {
                ...state,
                labHasChanged: action.payload
            }

        default:
            return state;
    }
}

export default labReducer;