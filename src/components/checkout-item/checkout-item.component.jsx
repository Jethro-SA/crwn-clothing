import { useContext, useEffect } from 'react';
import './checkout-item.styles';
import { CartContext } from '../../contexts/cart.context';
import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const { quantity, price, imageUrl, name } = cartItem;

    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
          <ImageContainer>
            <img src={imageUrl} alt={`${name}`} />
          </ImageContainer>
          <BaseSpan> {name} </BaseSpan>
          <Quantity>
            <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
            <Value>{quantity}</Value>
            <Arrow onClick={addItemHandler}>&#10095;</Arrow>
          </Quantity>
          <BaseSpan> {price}</BaseSpan>
          <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
      );
}

export default CheckoutItem;