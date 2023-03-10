const initialState = {
  start: false,
  success: false,
  categories: [],
  fail: false,
  errorMessage: "",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_START":
      return {
        ...state,
        start: true,
      };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        start: false,
        success: true,
        categories: action.payload,
      };
    case "FETCH_CATEGORIES_FAIL":
      return {
        ...state,
        start: false,
        fail: true,
        errorMessage: action.payload,
      };
    case "ADD_CATEGORIES":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "DELETE_CATEGORIES":
      const filteredCat = state.categories.filter(
        (item) => item.id != action.payload
      );
      return {
        ...state,
        categories: filteredCat,
      };
    case "EDIT_CATEGORIES":
      const EditedCategories = state.categories.filter(
        (item) => item.id != action.payload.id
      );
      return {
        ...state,
        categories: [...EditedCategories, action.payload],
      };

    // if(action.type === "ADD_CATEGORY")
    // return{
    //   ...state,
    //   categories:[...state.categories,action.payload]
    // }

    default:
      return state;
  }
};

export default categoriesReducer;
