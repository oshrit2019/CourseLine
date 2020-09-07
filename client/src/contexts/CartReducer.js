import $ from "jquery";

const Storage = cartItems => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};
const handleAddItem = (CourseId) => {
  var data = {
    email: sessionStorage.getItem("userEmail"),
    courseId: CourseId,
  };

  // Submit form via jQuery/AJAX
  $.ajax({
    type: "POST",
    url: "/AddCourseToCart",
    data: data,
  })
    .done(function (data) { console.log("Add to cart success!!") })
    .fail(function (jqXhr) { });
};

const handleRemoveItem = (CourseId) => {
  var data = {
    email: sessionStorage.getItem("userEmail"),
    courseId: CourseId,
  };

  // Submit form via jQuery/AJAX
  $.ajax({
    type: "POST",
    url: "/RemoveCourseFromeCart",
    data: data,
  })
    .done(function (data) { console.log("Remove from cart success!!") })
    .fail(function (jqXhr) { });
};

const handleIncreaseItem = (CourseId) => {
  var data = {
    email: sessionStorage.getItem("userEmail"),
    courseId: CourseId,
  };

  // Submit form via jQuery/AJAX
  $.ajax({
    type: "POST",
    url: "/IncreaseCourseFromeCart",
    data: data,
  })
    .done(function (data) { console.log("Increase from cart success!!") })
    .fail(function (jqXhr) { });
};

const handleDecreaseItem = (CourseId) => {
  var data = {
    email: sessionStorage.getItem("userEmail"),
    courseId: CourseId,
  };

  // Submit form via jQuery/AJAX
  $.ajax({
    type: "POST",
    url: "/DecreaseCourseFromeCart",
    data: data,
  })
    .done(function (data) { console.log("Decrease from cart success!!") })
    .fail(function (jqXhr) { });
};

const handleCheckout = () => {
  var data = {
    email: sessionStorage.getItem("userEmail"),
  };

  // Submit form via jQuery/AJAX
  $.ajax({
    type: "POST",
    url: "/Checkout",
    data: data,
  })
    .done(function (data) { console.log("checkout success!!") })
    .fail(function (jqXhr) { });
}



export const sumItems = cartItems => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find(item => item.id === action.payload._id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1
        });
        handleAddItem(action.payload.id);
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      };
    case "REMOVE_ITEM":
      handleRemoveItem(action.payload.id);
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter(item => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter(item => item.id !== action.payload.id)
        ]
      };
    case "INCREASE":
      handleIncreaseItem(action.payload.id);
      state.cartItems[
        state.cartItems.findIndex(item => item.id === action.payload.id)
      ].quantity++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      };
    case "DECREASE":
      handleDecreaseItem(action.payload.id);
      state.cartItems[
        state.cartItems.findIndex(item => item.id === action.payload.id)
      ].quantity--;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      };
    case "CHECKOUT":
      handleCheckout();
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([])
      };
    case "CLEAR":
      handleCheckout();
      return {
        cartItems: [],
        ...sumItems([])
      };
    default:
      return state;
  }
};
