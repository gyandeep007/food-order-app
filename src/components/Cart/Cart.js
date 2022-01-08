import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartItem from './CartItem';
const Cart = props =>{
  const cartCtx  = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const addHandler = (item)=>{
     cartCtx.addItem(item);
  }

  const removeHandler = (id)=>{
    cartCtx.removeItem(id);
  }
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartItems = <ul className={classes['cart-items']}>
  {console.log('context ',typeof cartCtx.items)}
                    {
                      
                      cartCtx.items.map((item)=><CartItem 
                                  key = {item.id}
                                  price={item.price}
                                  amount={item.amount}
                                  name = {item.name}
                                  onRemove = {removeHandler.bind(null,item.id)}
                                  onAdd  = {addHandler.bind(null,item)}
                                  />)
                    }
                    </ul>;

   return (
          <Modal onClose={props.onClose}>
                {cartItems}
                <div className={classes.total}>
                  <span>Total Amount</span>
                  <span>{totalAmount}</span>
                </div>
                <div className={classes.actions}>
                  <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                 {hasItems && <button className={classes.button}>Order</button> }
                </div>
          </Modal>
          )
}

export default Cart;