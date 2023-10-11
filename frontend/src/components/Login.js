
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import UserApi from '../api/UserApi';

export const Login = () => {

    const [feedbackMessage, setFeedbackMessage] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userInfo = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        // Call the api and the login method here
        UserApi.getUserByCredentials(userInfo, setFeedbackMessage);

        // Clear input fields from this point on
        e.target.username.value = ""
        e.target.password.value = ""
        
        
    }

    return (
        <Container className='p-5'>
           {feedbackMessage ? (
            <Alert onClose={() => setFeedbackMessage("")} dismissible>
                <Alert.Heading className='text-center'>{feedbackMessage}</Alert.Heading>
          </Alert>
           ):(<></>)}
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
                            <InputGroup>
                                <Form.FloatingLabel label="Password">
                                    <Form.Control 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Enter password" 
                                        name="password" 
                                        required 
                                    />
                                </Form.FloatingLabel>

                                <InputGroup.Text className='btn border m-auto p-3 ' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <>🙈</> : <>👀</>}
                                </InputGroup.Text>
                            </InputGroup>
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
