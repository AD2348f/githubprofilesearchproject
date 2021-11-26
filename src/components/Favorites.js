import React from 'react'


function Favorites({ favorites }) {
    
    return (        
           <div className='Fav__window'> 
            <h1>Favorite list</h1>
            <ul>
              {favorites.map(user =>
                user.favorite === true ? <div key={user.id}>{user.login}</div> : null
              )}
            </ul>        
          </div>         
    )
}

export default Favorites



