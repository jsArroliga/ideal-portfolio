import {
    UPDATE_RISK_LEVEL
} from './../actions/updateRiskLevel'


const initialState = { level : -1 }

export default function counterReducer(state = initialState, action) { 
  if (action.type === UPDATE_RISK_LEVEL) {
    return {
      ...state,
      level: action.payload.level
    }
  }
  return state
}