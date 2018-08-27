import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Cocktails from './components/Cocktails.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ingredientList: [],
      drinksList: [],
      searchList: [],
    }

    this.search = this.search.bind(this);
    this.addItem = this.addItem.bind(this);
    this.findDrinks = this.findDrinks.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`,
      success: (data) => {
        console.log(data);
        this.setState({
          ingredientList: data.drinks
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  }

  findDrinks() {
    let term = this.state.ingredientList[0].strIngredient1;
    console.log('term', term);
    $.ajax({
      url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${term}`,
      success: (data) => {
        console.log(data);
        this.setState({
          drinksList: data.drinks
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    console.log(this.state.drinksList);
  }

  search(e) {
    let term = e.target.value.toLowerCase();
    let list = this.state.ingredientList;
    let results  = [];
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].strIngredient1.toLowerCase().includes(term)) {
        results.push(list[i])
      }
    }
    this.setState({ items: results });
  }

  addItem(e) {
    let list = this.state.searchList;
    console.log(e.target.value);
    if (!list.includes(e.target.value)) {
      list.push(e.target.value);
    }
    console.log(this.state.searchList);
    this.setState({ searchList: list });

  }

  render () {
    return (
      <div>
        <div>
          <h1>Item List</h1>
          <Search handleChange={this.search}/>
          <List handleClick={this.addItem} items={this.state.items}/>
        </div>
        <div>
          {this.state.searchList.map( (item) => item )}
          <button onClick={this.findDrinks}>find drinks</button>
          {this.state.drinksList.length > 0 && <Cocktails drinks={this.state.drinksList}/>}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
