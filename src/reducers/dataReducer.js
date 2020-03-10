const initialState = {
    loading: false,
    data: {},
    error: null,
};

export default function data(params = '') {
    return (state = initialState, action) => {
        switch (action.type){
            case `data/${params}/REQUEST`:
                return { 
                    ...state,
                    loading: true,
                    error: null, 
                };
            case `data/${params}/SUCCESS`:
                return { 
                    ...state, 
                    loading: false, 
                    error: null, 
                    data: action.payload, 
                };
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

