import React from 'react';

const ListItem = (props) => (
  <div>
    {console.log(props.handleClick)}
    <button onClick={props.handleClick} value={props.item.strIngredient1}>Add</button>
    { props.item.strIngredient1 }
  </div>
)

export default ListItem;
