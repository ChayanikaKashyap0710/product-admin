export const incQuantity = () => {return {type: "INCREMENT"}}

export const decQuantity = () => {return {type: "DECREMENT"}}

export const customerLogin = (customerLoginResponse) => {return {type: "LOGIN", payload: { customerLoginResponse }}}
export const customerLogout = () => {return {type: "LOGOUT"}}
