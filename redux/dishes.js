import * as ActionTypes from './ActionTypes';

export const dishes = (state = { isLoading : true,
                                 errMess : null ,
                                 dishes : []}, action) => {
        switch (action.type){
            case ActionTypes.ADD_DISHES:
                return {...state , isLoading : false , errMess: null , dishes: action.payload}

            case ActionTypes.DISHES_LOADING:
                return {...state, isLoading: true, errMess: null, dishes: []}
    
            case ActionTypes.DISHES_FAILED:
                return {...state, isLoading: false, errMess: action.payload};

            case ActionTypes.ADD_DISH:
                const len=state.dishes.length;
                action.payload.id=len;
                return {...state, isLoading: false, errMess: null, dishes: state.dishes.concat(action.payload)};
            
            case ActionTypes.UPADATE_DISH:
                return {...state, isLoading: false, errMess: null, dishes: state.dishes.concat(action.payload)};
            
            case ActionTypes.DELETE_DISH:
                console.log('id of dish to be deleted **** '+action.payload);
                return {...state, isLoading: false, errMess: null, dishes: state.dishes.filter( (dish) => dish.id != action.payload)};
    
            default:
                return state;
        }                         
    
};