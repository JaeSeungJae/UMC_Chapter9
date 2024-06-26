import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { clearCart, removeItem, increase, decrease, calculateTotals, fetchCartItems } from './redux/cartSlice';
import {CartIcon} from './constants/icons';

const App = () => {
  const { cartItems, totalAmount, totalPrice, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCartItems());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (cartItems.length > 0) {
      dispatch(calculateTotals());
    }
  }, [cartItems, dispatch]);

  const handleIncrease = (id) => {
    dispatch(increase(id));
  };

  const handleDecrease = (id) => {
    dispatch(decrease(id));
  };

  return (
    <Container>
      <Header>
        <Title>Real Data UMC PlayList</Title>
        <CartIconContainer>
          <CartIcon />
          <ItemCount>{totalAmount}</ItemCount>
        </CartIconContainer>
      </Header>
      <CartSection>
        <SectionTitle>당신이 선택한 음반</SectionTitle>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>{error}</p>}
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <AlbumImage src={item.img} alt={item.title} />
            <ItemDetails>
              <h3>{item.title} | {item.singer}</h3>
              <p>₩ {item.price}</p>
            </ItemDetails>
            <AmountControls>
              <ControlButton onClick={() => handleIncrease(item.id)}>+</ControlButton>
              <Amount>{item.amount}</Amount>
              <ControlButton onClick={() => handleDecrease(item.id)}>-</ControlButton>
            </AmountControls>
            <RemoveButton onClick={() => dispatch(removeItem(item.id))}>Remove</RemoveButton>
          </CartItem>
        ))}
        <Total>
          <h3>Total Amount: {totalAmount}</h3>
          <h3>Total Price: ₩ {totalPrice}</h3>
          <ClearButton onClick={() => dispatch(clearCart())}>Clear Cart</ClearButton>
        </Total>
      </CartSection>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6200ea;
  padding: 15px 30px;
  color: white;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ItemCount = styled.div`
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: absolute;
  top: -10px;
  right: -10px;
`;

const CartSection = styled.section`
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
`;

const AlbumImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 5px;
`;

const ItemDetails = styled.div`
  flex: 1;

  h3 {
    font-size: 18px;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #555;
  }
`;

const AmountControls = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background-color: #6200ea;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
`;

const Amount = styled.p`
  margin: 0 10px;
  font-size: 18px;
`;

const RemoveButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
`;

const Total = styled.div`
  margin-top: 30px;
  text-align: right;

  h3 {
    margin: 10px 0;
    font-size: 20px;
  }
`;

const ClearButton = styled.button`
  background-color: #6200ea;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
`;

export default App;
