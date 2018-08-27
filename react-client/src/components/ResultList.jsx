import React from 'react';
import Cocktail from './Cocktail.jsx';

const ResultList = (props) => (
  <div>
    <h4> Results Component </h4>
    There are { props.drinks.length } cocktails.
    { props.drinks.map( (item, key) => <Cocktail key={key} drink={item}/>)}
  </div>
)

export default ResultList;
