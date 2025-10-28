import CartSection from "./CartSection"

const Cart=({cart,setCart,setCartClickCount})=>{
  
    return(
        <>
        <CartSection cart={cart} setCart={setCart} setCartClickCount={setCartClickCount}/>
        </>
    )
}
export default Cart