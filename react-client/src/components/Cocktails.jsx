import React from 'react';

const Cocktails = (props) => (
  <div>
    { props.drinks.map( (item) => item.strDrink) }
  </div>
)

export default Cocktails;
