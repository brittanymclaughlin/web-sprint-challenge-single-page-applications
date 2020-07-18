import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = props => {
    return (
        <HomeContain>
            <header>
                <h1>Brittany's Pizza</h1>
            </header>
            <Link to='/pizza'>Order a pizza!</Link>
        {props.orders.map((order, i) => <Card key={i} order={order} />)}
        </HomeContain>
    );
}

const HomeContain = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
        width: 100%;
        background-color: #000;
        height: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
            color: #fff;
            margin-top: 5rem;
            font-size: 3.6rem;
            backdrop-filter: brightness(40%);
            padding: 20px;
            border-radius: 15px;
        }
    }
    a {
        text-decoration: none;
        font-size: 2.4rem;
        padding: 20px;
        border: 3px solid #fff;
        color: #fff;
        margin: 5rem 0 5rem 0;
        &:hover {
            background: rgba(255, 255, 255, 0.05);
        }
    }
    div {
        color: white;
    }
`

export default Home;