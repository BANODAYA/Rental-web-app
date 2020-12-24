import React from 'react';
import Cards from '../Cards';
import SearchLocationInput from "../Search/SearchLocationInput";
import Footer from '../Footer';

//Calling dashBoard page
function Dashboard() {
  return (
    <>
      <SearchLocationInput
        onChange={() => null}
      />
      <Cards />
      <Footer />
    </>
  );
}

export default Dashboard;