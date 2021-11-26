import './App.css';
import { Routes , Route } from 'react-router-dom'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleUser from './components/SingleUser';


function App() {  
  return (
    <div class="container-fluid">    
      <Routes >
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<SingleUser />} />        
      </Routes> 
    </div>  
  );
}



export default App;
