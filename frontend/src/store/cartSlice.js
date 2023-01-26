import { createSlice} from "@reduxjs/toolkit";
import {logout} from "./authSlice";







let cartStorage = JSON.parse(localStorage.getItem("cart"))

const initialState={
    itemsInCart: cartStorage?.itemsInCart ? cartStorage?.itemsInCart : [],
    cartItemsnum: cartStorage?.cartItemsnum ? cartStorage?.cartItemsnum : 0,
    totalCount: cartStorage?.totalCount ? cartStorage?.totalCount : 0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const itemInCartIndex = state.itemsInCart.findIndex((item) => item._id === action.payload._id);
            if(itemInCartIndex >= 0)
            {   
                state.itemsInCart[itemInCartIndex].quantity +=1
                state.cartItemsnum +=1
                state.totalCount += state.itemsInCart[itemInCartIndex].price
            }
            else {
                let _id= action.payload._id
                let title =action.payload.title
                let price = action.payload.price
                let image = action.payload.images[0]
                let updatedproduct = {_id,title,price,image,quantity:1}
                state.itemsInCart.push(updatedproduct);
                state.cartItemsnum += 1
                state.totalCount +=updatedproduct.price*updatedproduct.quantity
            }
            let {itemsInCart,cartItemsnum,totalCount} = state
            localStorage.setItem("cart",JSON.stringify({itemsInCart,cartItemsnum,totalCount}))
        },
        incrementCart:(state, action) =>{
            const itemInCartIndex = state.itemsInCart.findIndex((item) => item._id == action.payload._id);
            if(itemInCartIndex >= 0){
                state.itemsInCart[itemInCartIndex].quantity +=1
                state.cartItemsnum +=1
                state.totalCount += state.itemsInCart[itemInCartIndex].price
                let {itemsInCart,cartItemsnum,totalCount} = state
                localStorage.setItem("cart",JSON.stringify({itemsInCart,cartItemsnum,totalCount}))    
            }
            else
            {
                let _id= action.payload._id
                let title =action.payload.title
                let price = action.payload.price
                let image = action.payload.images[0]
                let updatedproduct = {_id,title,price,image,quantity:1}
                state.itemsInCart.push(updatedproduct);
                state.cartItemsnum += 1
                state.totalCount +=updatedproduct.price*updatedproduct.quantity
            }
                
        },
        decrementCart:(state, action) =>{
            const itemInCartIndex = state.itemsInCart.findIndex((item) => item._id === action.payload._id);
            if(state.itemsInCart[itemInCartIndex].quantity >= 1){
                state.itemsInCart[itemInCartIndex].quantity -=1
                state.cartItemsnum -=1
                state.totalCount -= state.itemsInCart[itemInCartIndex].price
                let {itemsInCart,cartItemsnum,totalCount} = state
                localStorage.setItem("cart",JSON.stringify({itemsInCart,cartItemsnum,totalCount}))
                if(state.itemsInCart[itemInCartIndex].quantity < 1){
                    const updatedItemsCart = state.itemsInCart.filter((item) => item._id !== action.payload._id);
                    state.itemsInCart=updatedItemsCart;
                    let {itemsInCart,cartItemsnum,totalCount} = state
                    localStorage.setItem("cart",JSON.stringify({itemsInCart,cartItemsnum,totalCount}))
                }
            }  
        },
        deleteFromCart:(state,action) => {
            const itemInCartIndex = state.itemsInCart.findIndex((item) => item._id === action.payload._id);
            state.cartItemsnum -= state.itemsInCart[itemInCartIndex].quantity;
            state.totalCount -= state.itemsInCart[itemInCartIndex].price*state.itemsInCart[itemInCartIndex].quantity
            state.itemsInCart.splice(itemInCartIndex,1); 
            let {itemsInCart,cartItemsnum,totalCount} = state
            localStorage.setItem("cart",JSON.stringify({itemsInCart,cartItemsnum,totalCount}))
        },
        removeCart:(state) => {    
                  state.itemsInCart= []
                  state.cartItemsnum=0
                  state.totalCount=0
                  let {itemsInCart,cartItemsnum,totalCount} = state
                  localStorage.setItem("cart",JSON.stringify({itemsInCart,cartItemsnum,totalCount}))
        },
    },
    extraReducers:{
        [logout]:(state,action) => {
            state.totalproductscart="0"
       },
    }
})


export const {addToCart,incrementCart,decrementCart,deleteFromCart,removeCart} = cartSlice.actions;
export default cartSlice.reducer;