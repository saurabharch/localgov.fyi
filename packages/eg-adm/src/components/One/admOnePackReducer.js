import * as types from "./ActionTypes";

const initialState = {
  fetching: false,
  items: [],
  failure: false,
  failureMsg: ""
};

export function admOnePackReducer(state = initialState, action) {
    switch (action.type) {
      case types.FETCH_PACK_ITEMS_START:
        return {
          ...state,
          fetching: true
        };
        break;

      case types.FETCH_PACK_ITEMS_SUCCESS:
        return {
          ...state,
          fetching: false,
          failure: false,
          items: action.items
        };
        break;

      case types.FETCH_PACK_ITEMS_FAILURE:
        return {
          ...state,
          fetching: false,
          failure: true
        };
        break;
      default:
        return state;
    }
}
