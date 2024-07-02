
const initialLoginState = {
  isAuthenticated: false,
  user: {}
};

const customerLoginStatus = (state = initialLoginState, action) => {
  switch (action.type) {
    case 'LOGIN':
      if(action.payload == "SUCCESS"){
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
   }else{
      return {
         ...state,
         isAuthenticated: false,
         user: action.payload
       };
   }
    case 'LOGOUT':
      return initialLoginState;
    default:
      return state;
}
};


export default customerLoginStatus;
