import { weatherActionTypes } from './actions';

export const initialState = {
  weatherData: {},
};

export function weatherReducer(state, action) {
  switch(action.type) {
    case weatherActionTypes.UPDATE_GRAPH_DATA:
      return {
        ...state,
        weatherData: action.payload,
      };
      
    default:
      return state;
  }
}