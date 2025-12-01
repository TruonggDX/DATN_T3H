import {createContext, useContext, useEffect, useState} from "react";
import cartService from "@/service/cartService";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await cartService.getAllCart();
            setCartData(response.content);
        } catch (error) {
            console.error(error);
        }
    };

    const addCart = async (req) => {
        try {
            await cartService.addCart(req);
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };

    const removeData = async (id) => {
        try {
            await cartService.deleteCart(id);
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };

    const removeAllData = async (ids) => {
        try {
            await cartService.deleteAllCart(ids);
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };

    const updateData = async (id, req) => {
        cartService.updateCart(id, req)
            .then(() => {
                fetchCartData();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <CartContext.Provider value={{cartData, addCart, removeData, updateData, removeAllData}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
