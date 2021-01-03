export const UPDATE_RISK_LEVEL = 'UPDATE_RISK_LEVEL';
const updateRiskLevel = level => {
    return {
      type: 'UPDATE_RISK_LEVEL',
      payload: level
    }
  }

export default updateRiskLevel;