import {LAB_ACTION_TYPES} from './lab.reducer';

export const setCurrentLab = lab => ({
    type:       LAB_ACTION_TYPES.SET_CURRENT_LAB,
    payload:    lab
})

export const setCurrentLabID = lab_id => ({
    type:       LAB_ACTION_TYPES.SET_CURRENT_LAB_ID,
    payload:    lab_id
})

export const setCurrentStep = step => ({
    type: LAB_ACTION_TYPES.SET_CURRENT_STEP,
    payload: step
})

export const deleteCurrentStep = lab => ({
    type: LAB_ACTION_TYPES.DELETE_CURRENT_STEP,
    payload: lab
})

export const setLabView = labView => ({
    type: LAB_ACTION_TYPES.SET_LAB_VIEW,
    payload: labView
})