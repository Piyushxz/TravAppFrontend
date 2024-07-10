import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { CategoryProvider } from './context/category-context';
import { FilterProvider } from './context/filter-context';
import { BrowserRouter } from 'react-router-dom';
import { DateProvider } from './context/date-context';
import { AuthProvider } from './context/auth-context';
import { WishlistProvier } from './context/wishlist-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <CategoryProvider>
      <DateProvider>
        <FilterProvider>
          <AuthProvider>
          <BrowserRouter>
          <WishlistProvier>
          <App />

          </WishlistProvier>
        </BrowserRouter>
          </AuthProvider>

        </FilterProvider>
  
      
      </DateProvider>
  
    </CategoryProvider>
 


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
