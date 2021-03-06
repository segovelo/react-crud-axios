import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

export default function Create() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    let history = useHistory();
    const postData = () => {
        axios.post(`https://xxxxxxxxxxxxxxx.mockapi.io/api-crud/v1/fakeData`, {
            firstName,
            lastName,
            checkbox
        }).then(() => { history.push('/index.html/read') })
        console.log(firstName);
        console.log(lastName);
        console.log(checkbox);
    }
    return (
        <div className="main">
            <h2 className="main-header">React Crud Operations</h2> 
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)} />
                </Form.Field>
                <div className="nav-div">
                    <Button className="nav-button" onClick={postData} type='submit'>Submit</Button>
                    <Link className='nav-button' to="/index.html/read"><Button>Users</Button></Link>
                </div>
            </Form>
        </div>
    )
}
