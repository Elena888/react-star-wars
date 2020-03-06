import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../actions/types";

//import {FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE} from "../actions/types";

const initialState = {
    data: [],
};

export default function data(params = '') {
    return (state = initialState, action) => {
        switch (action.type){
            case ADD_TO_FAVORITES:
                return { 
                    ...state,
                    data: action.payload
                };
            case REMOVE_FROM_FAVORITES:
                return state.filter((item)=>item.url !== action.itemUrl)
            case `data/${params}/FAILURE`:
                return { 
                    ...state, 
                    loading: false, 
                    error: action.error, 
                };
            default:
                return state
        }
    };
}

