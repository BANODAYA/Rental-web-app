import React from 'react';
import '../../../App.css';
import Cards from '../../mainPage/Layout/Cards';
import RcSearch from "../../mainPage/Layout/Search/RcSearch";

import Header from "../Header/Header";
import Footer from '../../mainPage/Layout/Footer';

//Rental Page for Rental Calculator
function RentalPage() {
  return (
    <>
    <Header />
    <div className="app">
      <RcSearch
        onChange={() => null}
      />
      <Cards />
      <Footer />
    </div>
    </>
  );
}

export default RentalPage;