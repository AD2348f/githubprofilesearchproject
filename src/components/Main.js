import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Favorites from './Favorites';


  const Main = () => { 

    const [userSearch, setUserSearch] = useState('');
    const [foundUser, setFoundUser] = useSaveState([]);
    const searchForUser = (event) => {
      event.preventDefault();
      performSearchRequest();
    }
   
    // custom Hook to Save data into loacStorage
    function useSaveState(defaultValue, key) {
      const [value, setValue] = React.useState(() => {
        const saveValue = window.localStorage.getItem(key);
        return saveValue !== null
          ? JSON.parse(saveValue)
          : defaultValue;
      });
      React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
      }, [key, value]);
      return [value, setValue];
    }

    
    // get GitHub search API
    const performSearchRequest = async () => {
        axios.get(`https://api.github.com/search/users?q=${userSearch}`)
        .then((response) => {
          const allUsers = response.data.items;
          setFoundUser(allUsers);
          console.log(foundUser)        
      }) .catch (error => console.log(error));      
    }  

    function clearSearch () {
      setFoundUser([])
    }
    
    // Favorite logic
    const data = foundUser  
    const [favorites, setFavorites] = useSaveState([]);
  
    useEffect(() => {
      setFavorites(data);
    }, []);
  
    useEffect(() => {
      setFavorites(favorites);
    }, [favorites]);
  
    function handleFavorite(id) {
      const newFavorites = favorites.map(user => {
        return user.id === id ? { ...user, favorite: !user.favorite } : user;
      });
      setFavorites(newFavorites);
    }

    const [fav, setFav] = useState('inactive')
    const handleFav = () => {
      if (fav === 'inactive') {
        setFav('active')
      }
      if (fav === 'active') {
        setFav('inactive')
      }
    }
 
    return (      
        <div class="container-fluid">
          <div class="row justify-content-md-center row mx-auto mb-4 py-5 h-100 bg-dark">
            <div class="col text-white">
              <h4>Github profile search</h4>
            </div>
            <div class="col">
              <form className="search-user" onSubmit={searchForUser}>
              <input value={userSearch} onChange={event => setUserSearch(event.target.value)} placeholder="Enter a username..."/>
              <button>Search</button><button onClick={clearSearch}>Clear</button>
              </form>
            </div>
            <div class="col text-white">
            <div className="App__button--help" onClick={handleFav}>
            <Button type="button" variant="secondary">Favorites</Button>                      
          </div>  
            </div>
          </div>
          <div class="row">
          {foundUser.map((user, i) =>(
              <div class="col mb-3" key={user.id}>
                <Card style={{ width: '18rem' }} >
                  <Card.Img variant="top" src={user.avatar_url} />
                  <Card.Body>
                    <Card.Title>{user.login}</Card.Title>
                    <Card.Text>
                    
                    </Card.Text>
                    <Stack direction="horizontal" gap={3}>
                      <Button variant="primary">
                        <Link to={`${user.id}`} class="text-white text-decoration-none">Read more</Link>
                      </Button>
                      <Button
                        onClick={() => {
                          handleFavorite(user.id);
                        }}
                      >
                      {user.favorite === true ? "Remove Fav" : "Ad Fav"}
                      </Button> 
                    </Stack>                                
                  </Card.Body>
                </Card>            
              </div>
              ))
            }
          </div>
          {fav === 'inactive'? [] : <Favorites favorites={favorites} handleFav={handleFav}/>} 
               
        </div>
    )
  };


export default Main
