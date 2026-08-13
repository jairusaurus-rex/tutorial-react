import { useReducer } from "react";

const initialState = {
    items: [],
    totalAmount: 0,
    totalItems: 0
}

const reducer = (state, action) => {
    switch(action.type){
        case "CLEAR_ITEMS":{
            return initialState
        }
        case "ADD_ITEM":{
            console.log(",....>", action.payload)
            const existingItemIndex = state.items.findIndex( item => item.id === action.payload.id)
            console.log(",....>", existingItemIndex)
            let updatedItems;
            if (existingItemIndex >=0){
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {...updatedItems[existingItemIndex], quantity: updatedItems[existingItemIndex].quantity + 1 };

            }else{
                updatedItems = [...state.items, {...action.payload, quantity: 1}]
            }
            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedItems.reduce(
                    (total, item) => total + item.price * item.quantity, 0
                ),
                totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
            }
        }
        default: 
            return state;
        }
}

export const ShoppingCartWithReduce = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const products = [
        {id: 1, name: "Starship", price: 200},
        {id: 2, name: "Pistol Blaster", price: 10},
        {id: 3, name: "Personal Scanner", price: 10},
        {id: 4, name: "Supply", price: 2}
    ]
    return <div>
        <div>

        <h2>Shoppiong cart {products.length}</h2>
        {
            products.map((product) => (
                <div key={product.id} >
                    <h3>{product.name} - ${product.price}k
                    <button onClick={() => dispatch({
                        type: "ADD_ITEM",
                        payload: product
                    })}>➕</button>
                    </h3>
                </div>
            ))

        }
        </div>
        <div>
            <h2>Shopping cart</h2>
            {state.items.length === 0 ? <p>your cart is empty</p>
            :
                <div>
                    {state.items.map((item) => 
                        <div key={item.id}>
                            <p>{item.name} - ${item.price}k ✖️ {item.quantity} </p>
                        </div>
                    )}
                </div>
            }
            <h3>Total items: {state.totalItems}</h3>
            <h3>Total amount: {state.totalAmount}</h3>
            <button onClick={() => dispatch({
                        type: "CLEAR_ITEMS"
                    })}>clear </button>
        </div>
    </div>
}