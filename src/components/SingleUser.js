import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';


const SingleUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [loader, setLoader] = useState(true);
    const url = "https://api.github.com/user";
    
    
    // Get single User from Github
    const fetchUser = async() => {
        setLoader(true);
        await Axios.get(`${url}/${id}`)        
        .then((response) => {
            const SingleUser = response.data;
            setUser(SingleUser)            
        }).catch((error) => console.log(error))
        .finally(()=>setLoader(false))    
    }   

    useEffect(() => { fetchUser();
    }, []);

    

  return !loader && ( 
    <div class="container mt-5">
        <div class="row justify-content-md-center" > 
        <Card style={{ width: '25rem' }}>
        <Card.Img variant="top" src={user.avatar_url} class="mt-3" />
        <Card.Body>
            <Card.Title>{user.login}</Card.Title>
            <Card.Text>
                <div>Bio: {user.bio}</div>
                <div>Blog: {user.blog}</div>
                <div>Followers: {user.followers}</div>
                <div>Location: {user.location}</div>
                <div>Repos: {user.public_repos}</div>
                <a href={`https://github.com/${user.login}`}>Visit profile</a>
            </Card.Text>
            <Stack direction="horizontal" gap={3}>
            <Button variant="primary"  onClick={() => navigate('/')}>Back to search</Button>           
            </Stack>
        </Card.Body>
        </Card>
        </div>
    </div>
      )  
};


export default SingleUser;


