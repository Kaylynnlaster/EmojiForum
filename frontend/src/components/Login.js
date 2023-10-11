
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import UserApi from '../api/UserApi';

export const Login = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userInfo = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        // Call the api and the login method here
        UserApi.getUserByCredentials(userInfo);
        
    }

    return (
        <Container className='p-5'>
            
            <Container className='d-flex justify-content-center align-items-center'>

                <Container className='d-flex justify-content-center'>
                    <EmojiPicker/>
                </Container>
                <Container>
                    <Form className="p-5" onSubmit={handleSubmit}>
                        <h1>Need to log in❓</h1>
                        <Form.Text>You can log in here.</Form.Text>
                        <Form.Group className='my-5'>
                            <Form.FloatingLabel label="Username">

                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter username" 
                                    name="username" 
                                    required
                                />
                            </Form.FloatingLabel>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.FloatingLabel label="Password">
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter password" 
                                    name="password" 
                                    required 
                                />
                            </Form.FloatingLabel>
                        </Form.Group>
                        <Form.Text>
                        Need an account?🤔{' '}
                            <Link to="/signup">Sign up here.</Link>
                        </Form.Text>
                        <div className='my-3'>
                            <Button className='w-50' type="submit">Login</Button>
                        </div>
                    </Form>
                </Container>

            </Container>
            
        </Container>
  )
}
