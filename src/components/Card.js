import React from 'react';
import styled from 'styled-components';

const Card = ({ order }) => {

    const displayToppings = () => {
        const toppings = Object.keys(order.toppings);

        const orderedToppings = []

        toppings.forEach(key => {
            if (order.toppings[key]) {
                orderedToppings.push(key);
            }
        })
        return orderedToppings;
    }
    return (
        <Container2>
            <h2>Now Cooking....</h2>
            <h2>{order.name}</h2>
            <p>{order.size}</p>
            {displayToppings().map((topping, i) => <p key={i}>{topping}</p>)}
            <p>{order.instructions}</p>
        </Container2>
    );
}
const Container2 = styled.div`
  text-align:center;
  `
export default Card;