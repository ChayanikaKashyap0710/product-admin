const initialState = 0;

const numberChange = (state = initialState, action) => {
 switch(action.type){
    case "INCREMENT" : return state + 1;
    case "DECREMENT" : if(state == 0 || state < 0){state =0;}else{state =state-1;} return state;
    default: return state;
 }
}

export default numberChange;