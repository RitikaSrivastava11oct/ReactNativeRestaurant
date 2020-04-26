import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import moment from "moment";

export const fetchComments = () => (dispatch) => {
    console.log('************* fetching **************');
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const addComment = (comments) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comments
});

export const postComment = (dishId , rating ,author, comment)  => (dispatch) => {
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss a');
    const commentNew={
        dishId : dishId,
        rating : rating,
        comment : comment,
        author : author,
        date : date
    }
    setTimeout(() => {
        dispatch(addComment(commentNew));
    }, 2000);
};

export const fetchDishes = ()=>(dispatch) => {
    dispatch (dishesLoading());

    return fetch(baseUrl + 'dishes')
    .then( response => {
        if( response.ok){
            
            return response;   
        }
        else{
            var error =new Error('Error '+ response.status + ':' + response.statusText);
            error.response=response;
            throw error;
        }
    },error => {
        var errmess = new Error (error.message);
        throw errmess;
    }
    )
    .then( response => response.json())
    .then( dishes => dispatch (addDishes(dishes)))
    .catch(error => dispatch (dishesFailed(error.message)))

};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const postDish = (name,category,label,price,description) =>(dispatch) => {
    const data = {
        "name" : name,
        "image": "images/uthappizza.png",
        "category" : category,
        "label" : label,
        "price" : price,
        "featured" : "false",
        "description" : description
    }
    // console.log('data ====='+ JSON.stringify(data));
    const ob = baseUrl + 'dishes';
    const ob1={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
          
    };
    console.log('ob***** '+ ob);
    console.log('ob1***** '+ ob1);
    console.log('ob1***** '+ JSON.stringify(ob1));
    return fetch(ob, ob1)
    .then(response => {
        console.log('new dish added *********** '+response);
         return response.json()
    })
    .then( dish => {
        console.log(" 111111111111 "+ dish);
        dispatch (addDish(dish))})
    .catch(error => dispatch (dishesFailed(error.message)))

};

export const deleteDishDB= (dishId) =>(dispatch) => {
    dispatch(deleteDish(dishId));
    return fetch(baseUrl + 'dishes', {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
                id : dishId
            }
          )
    }).then(response => {
        console.log('dish deleted *********** '+JSON.stringify(response));
         return response.json()
    })
    .catch(error => dispatch (dishesFailed(error.message)))

};

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const addDish = (dish) => ({
    type: ActionTypes.ADD_DISH,
    payload: dish
});

export const deleteDish = (dishId) => ({
    type: ActionTypes.DELETE_DISH,
    payload: dishId
}); 

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + "promotions")
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => 
            {
                console.log('999999999999999999999  '+JSON.stringify(response))
                return response.json()
            })
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + "leaders")
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    //.then(response => response.json())
    .then(response => 
    {
        console.log('*******************  '+JSON.stringify(response))
        return response.json()
    })
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFavorite = (dishId)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
}); 