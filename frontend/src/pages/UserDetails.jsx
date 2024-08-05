import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import axios from 'axios'

export default function UserDetails() {
    const navigate = useNavigate()
    const location = useLocation();
    const content = location.state
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const handleEdit = () => {
        // console.log(edit)
        edit? setEdit(false) : setEdit(true);
    }


    const handleDelete = async (e) => {
        try{
            e.preventDefault();
            const confirmation = window.confirm(`Are you sure you want to delete user: ${content.username}?`);
            
            if (confirmation){
                const response = await axios.delete(`http://localhost:8000/delete-user/${content.id}`)
                // console.log(response.data.message)
                navigate('/users')
                
            }
        }
        catch(error){
            console.log(error.response.data.message);
        }
        

    }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();


            if (!username || !email || !password){
                alert('enter all fields')
                return;
            }

            const response = await axios.patch("http://localhost:8000/update-user", {id: content.id, email: email, username: username, password: password})
            console.log(response.data.message)

            navigate('/users')

        }
        catch(error){
            console.log(error.response.data.error);
            alert(error.response.data.error.sqlMessage)
        }
        

    }

    const getUsername = (e) =>{
        e.preventDefault();
        setUsername(e.target.value)
        console.log(username)

    }

    const getEmail = (e) =>{
        e.preventDefault();
        setEmail(e.target.value)


        
    }

    const getPassword= (e) =>{
        e.preventDefault();
        setPassword(e.target.value)


        
    }







  return (
    <>
    <NavBar user={true}/>
    <Container> 
        <Card  className='mt-2'>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Card.Text>Username: {content.username}</Card.Text>
                        <Card.Text>Email: {content.email}</Card.Text>
                        <Card.Text>Password: {content.password}</Card.Text>
                    </div>
                
                    <div>
                        <Button variant="primary" size="sm" className="me-2" onClick={handleEdit}>
                            <FaEdit />
                        </Button>
                        <Button variant="danger" size="sm" onClick={handleDelete}>
                            <FaTrash />
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
        {edit ?<Card  className='mt-2'>
            <Form className='p-3'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder={content.email} onChange={getEmail}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder={content.username} onChange={getUsername}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder={content.password} onChange={getPassword} />
                </Form.Group>

               
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Update
                </Button>
                </Form>
        </Card> : null}
    </Container>
    </>
  )
}
