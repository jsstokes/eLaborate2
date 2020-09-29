import { WORKSHOP_ACTION_TYPES } from './workshop.reducer';

export const setCurrentWorkshop = workshop => ({
    type:       WORKSHOP_ACTION_TYPES.SET_CURRENT_WORKSHOP,
    payload:    workshop
})

export const setCurrentWorkshopList = workshopList => ({
    type:       WORKSHOP_ACTION_TYPES.SET_WORKSHOP_LIST,
    payload:    workshopList
})