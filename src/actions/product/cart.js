
export const getAllCartItem = (cb) => {
    const cartList = localStorage.getItem("qwiki_cart");
    return JSON.parse(cartList)
}

export const addToCart = (product,cb) => {
    let newCartList = []
    const oldCartList = localStorage.getItem("qwiki_cart");
    if(oldCartList===null){
        newCartList.push(product);
        localStorage.setItem("qwiki_cart",JSON.stringify(newCartList))
    }else{
        const oldCartListObject = JSON.parse(oldCartList);
        newCartList = [...oldCartListObject];
        newCartList.push(product);
        localStorage.removeItem("qwiki_cart")
        localStorage.setItem("qwiki_cart",JSON.stringify(newCartList))
    }
}

export const updateQuantity = (type="inc",item,cartList) => {
    let updatedItem;
    if(type==="dec"){
        const newQuantity = item.quantity-1;
        const newTotalPrice = newQuantity*item.p_price;
        updatedItem = {...item,quantity:newQuantity,totalPrice:newTotalPrice}

    }else{
        const newQuantity = item.quantity+1;
        const newTotalPrice = newQuantity*item.p_price;
        updatedItem = {...item,quantity:newQuantity,totalPrice:newTotalPrice}
    }
    if(updatedItem){
        let newList = []
        cartList.map((cartItem,i)=>{
            if(cartItem.id===item.id){
                newList.push(updatedItem)
            }else{
                newList.push(cartItem)
            }
        })
        localStorage.removeItem("qwiki_cart")
        localStorage.setItem("qwiki_cart",JSON.stringify(newList))
    }
}

export const removeCartItem = (item,cartList) => {
    let index = -1;
    cartList.map((cartItem,i)=>{
        if(cartItem.id===item.id){
            index = i;
        }
    })
    cartList.splice(index,1)
    if(cartList.length<1){
        localStorage.removeItem("qwiki_cart")
    }else{
        localStorage.setItem("qwiki_cart",JSON.stringify(cartList))
    }
}