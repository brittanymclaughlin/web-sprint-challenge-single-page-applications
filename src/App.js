import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import Form from './components/Form';
import Home from './components/Home';

const App = () => {
  const [orders, setOrders] = useState([]);

  const addOrder = order => {
    setOrders([...orders, order]);
  }

  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/pizza">
          <Form addOrder={addOrder} />
        </Route>
        <Route exact path='/'>
          <Home orders={orders} />
        </Route>
      </Switch>
    </Container>
  );
};


const Container = styled.div`
  background: #000;
  `
export default App;


