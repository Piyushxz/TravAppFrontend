<<<<<<< HEAD
=======

import './App.css';
>>>>>>> 7dc9dceb (Initial Commit)

import './App.css';
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SingleHotel } from './components/SingleHotel/SingleHotel';
import { SearchResult } from './components/SearchResults/SearchResults';
import { Filter } from './components/Filter/Filter';
import { Wishlist } from './pages/Wishlist/Wishlist';
import { Payment } from './pages/Payment/Payment';
function App() {
  return (
<<<<<<< HEAD
    <>
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/hotels/:name/:address/:id/reserve' element={<SingleHotel/>}/>
      <Route path='/hotels/:address' element={<SearchResult/>}/>
      <Route path='/filter' element={<Filter/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path="/confirm-booking/stay/:id" element={<Payment/>}/>
    </Routes>
   
    </>
  )
=======
    <div className="App">
      HEy
    </div>
  );
>>>>>>> 7dc9dceb (Initial Commit)
}

export default App;
