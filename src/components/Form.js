import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';


const defaultFormState = {
    name: '',
    size: '',
    toppings: {
        pepperoni: false,
        bacon: false,
        peppers: false,
        onion: false,
        tomato: false,
        spinach: false,
        xcheese: false
    },
    instructions: ''
}

const defaultErrorState = {
    name: ''
}

const Form = props => {
    const [formState, setFormState] = useState(defaultFormState);
    const [errors, setErrors] = useState(defaultErrorState);
    const [isDisabled, setIsDisabled] = useState(true);

    const schema = yup.object().shape({
    name: yup
    .string()
    .required('Please enter your name')
    .min(2, 'Please enter a real name.')
})

    useEffect(() => {
        schema.isValid(formState).then(valid => setIsDisabled(!valid));
    }, [formState, schema])

    const validate = e => {
        e.persist();
        yup.reach(schema, e.target.name).validate(e.target.value)
        .then(valid => setErrors({...errors, [e.target.name]: ''}))
        .catch(err => setErrors({...errors, [e.target.name]: err.errors[0]}));
    }

    const handleChange = e => {
        if (e.target.type === 'checkbox') {
            setFormState({
                ...formState,
                toppings: {
                    ...formState.toppings,
                    [e.target.value]: e.target.checked
                }
            })
        } else {
            setFormState({
                ...formState,
                [e.target.name]: e.target.value
            })
        }
        if (e.target.name === 'name') {
            validate(e);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formState);
        axios.post("https://reqres.in/api/users", formState)
        .then(res => props.addOrder(res.data))
        .catch(err => console.log(err));
    }

    return (
        <FormContainer>
            <h1>Place Your Order!</h1>
            <form onSubmit={handleSubmit}>
            <label>Name:  
                <input type='text' name='name' onChange={handleChange} data-cy='name' value={formState.name} />
                {errors.name.length > 0 && <p style={{color:'red'}}>{errors.name}</p>}
            </label>
            <label>Desired Size:  
                <select name='size' data-cy='size' defaultValue='Large' onChange={handleChange}>
                    <option value='Small'>Small</option>
                    <option value='Medium'>Medium</option>
                    <option value='Large'>Large</option>
                    <option value='XLarge'>X-Large</option>
                </select>
            </label>
            
            <fieldset>
                <h3 className="top">Toppings</h3>
                <label>
                    <input type='checkbox' name='toppings' onChange={handleChange} data-cy='pepperoni' value='pepperoni' />
                    Pepperoni
                </label>
                <label>
                    <input type='checkbox' name='toppings' onChange={handleChange} data-cy='bacon' value='bacon' />
                    Bacon
                </label>
                <label>
                    <input type='checkbox' name='toppings' onChange={handleChange} data-cy='peppers' value='peppers' />
                    Green Peppers
                </label>
                <label>
                    <input type='checkbox' name='toppings' onChange={handleChange} data-cy='onion' value='onion' />
                    Onions
                </label>
                <label>
                    <input type='checkbox' name='toppings' onChange={handleChange} data-cy='tomato' value='tomato' />
                    Tomatoes
                </label>
                <label>
                    <input type='checkbox' name='toppings' onChange={handleChange} data-cy='spinach' value='spinach' />
                    Spinach
                </label>
                <label>
                    <input type='checkbox' name='toppings' onChange={handleChange} data-cy='xcheese' value='xcheese' />
                    Extra Cheese
                </label>
              
            </fieldset>
            <label> Special Instructions: 
                <textarea name='instructions' data-cy='instructions' onChange={handleChange} value={formState.instructions} />
            </label>
            <button data-cy="submit-button" disabled={isDisabled} type='submit'>Add To Order</button>
            </form>
        </FormContainer>
    );
}

const FormContainer = styled.div`
    margin: 5rem auto;
    width: 300px;
    display: flex;
    flex-direction: column;
    color: #fff;
    form{
        display:flex;
        flex-direction:column;
        padding:30px;
        label{
            padding:10px;
        }
    }
    h1{
        text-align:center;
    }
    .top{
        text-decoration:underline;
    }
    button{
        height:30px;
        border-radius:5px;
        color: #000;
    }
    fieldset{
        display:flex;
        flex-direction:column;
    }
    textarea{
        height:100px;
        width:225px;
    }

`

export default Form;