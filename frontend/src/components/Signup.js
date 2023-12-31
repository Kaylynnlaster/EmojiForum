import { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import EmojiPicker from 'emoji-picker-react';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import UserApi from '../api/UserApi';


export const Signup = () => {

    const [feedbackMessage, setFeedbackMessage] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })
    const [isValidField, setIsValidField] = useState({
        username: false,
        password: false
    });

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const validateUsername = (value) => {
        
        const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;
        console.log(usernameRegex.test(value))
        return usernameRegex.test(value);

    }

    const validatePassword = (value) => {
      
        const passwordRegex = /^(?=.*\d).{8,}$/;
        console.log(passwordRegex.test(value))
        return passwordRegex.test(value);
        
    }

    const validationFunctions = {
        username: validateUsername,
        password: validatePassword,
    }

    const checkIfValid = (name, value) => {
        
        if(validationFunctions[name]){
            const isValid = validationFunctions[name](value);
            setIsValidField((prevValue) => ({
                ...prevValue,
                [name]: isValid
            }))
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name + ":" + value);
        checkIfValid(name, value);

        setUserInfo((prevValue) => ({
            ...prevValue,
            [name] : value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(userInfo);


        // Call the user api method here
        UserApi.createUser(userInfo, setFeedbackMessage);

        // Clear the user info state and clear the input fields
        setUserInfo({
            username: "",
            password: ""
        });

        setIsValidField({
            username: false,
            password: false,
        })

        if (usernameRef.current) {
            usernameRef.current.value = '';
        }
        if (passwordRef.current) {
            passwordRef.current.value = '';
        }
    }

    return (
        <Container className='p-5'>
            {feedbackMessage ? (
            <Alert variant="success" onClose={() => setFeedbackMessage("")} dismissible>
                <Alert.Heading className='text-center'>{feedbackMessage}</Alert.Heading>
            </Alert>):(<></>)}
            <Container className='d-flex justify-content-center align-items-center'>
                <Container>
                    <Form className="p-5" onSubmit={handleSubmit}>
                        <h1>Need an account❓</h1>
                        <Form.Text>You can create an account here.</Form.Text>
                        <Form.Group className='my-5'>
                            <Form.FloatingLabel label="Username">

                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter username" 
                                    name="username" 
                                    pattern='^[a-zA-Z0-9]{5,}$' 
                                    onChange={handleChange} 
                                    ref={usernameRef} 
                                    required
                                />
                            </Form.FloatingLabel>
                            { isValidField.username ? <span>👍</span> : <span>👎</span>}
                            <Form.Text className='px-2'>Username must be at least 5 alpha-numeric characters</Form.Text>
                            
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <InputGroup>
                            <Form.FloatingLabel label="Password">
                                <Form.Control 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter password" 
                                    name="password" 
                                    pattern='^(?=.*\d).{8,}$' 
                                    onChange={handleChange} 
                                    ref={passwordRef}
                                    required 
                                    />
                                
                            </Form.FloatingLabel>
                            <InputGroup.Text className='btn border m-auto p-3 ' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <>🙈</> : <>👀</>}
                            </InputGroup.Text>
                            </InputGroup>
                            { isValidField.password ? <span>👍</span> : <span>👎</span>}
                            <Form.Text className='px-2'>Password must be at least 8 characters with at least one digit</Form.Text>
                        </Form.Group>
                        <Form.Text>
                        Already have an account?🤔{' '}
                            <Link to="/login">Login here.</Link>
                        </Form.Text>
                        <div className='my-3'>
                            <Button className='w-50' type="submit">Sign up</Button>
                        </div>
                    </Form>
                </Container>

                <Container className='d-flex justify-content-center'>
                    <EmojiPicker/>
                </Container>

            </Container>
                 
        </Container>
    )
}
