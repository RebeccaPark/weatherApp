export const weatherActionTypes = {
  UPDATE_GRAPH_DATA : 'UPDATE_GRAPH_DATA',
};

export function updateGraphData(data) {
  return {
    type: weatherActionTypes.UPDATE_GRAPH_DATA,
    payload: data,
  }
}

