const initialSearchState = {
    searchData: {}
  };
  

const searchResult = (state = initialSearchState, action) => {
 switch(action.type){
    case "SEARCH" : 
    return {
        searchData: action.payload
    }
    default: return state;
 }
}

export default searchResult;