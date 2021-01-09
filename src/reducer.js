export const initialState = {
  date: [],
  user: null,
  products: [],
  chosedDate: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        products: [...state.products, action.item],
      };

    case "FILTER_PRODUCTS":
      return {
        ...state,
        products: action.item,
      };

    case "EMPTY_PRODUCTS":
      return {
        ...state,
        products: [],
      };

    case "CHOOSED_PRODUCT":
      return {
        ...state,
        choosedProduct: action.item,
      };

    case "NO_PRODUCT":
      return {
        ...state,
        choosedProduct: null,
      };

    default:
      return state;
  }
};

export default reducer;
