//ORIGINAL CODE FOR APP.JS

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


function AddNewItem(props) {
  return (
    <div>
      <h1>To Do List: </h1>

      <form

      >
        <label>
          <input
            type="text"
            value={props.newItem}
            onChange = {props.handleInputNewItem}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          onClick={props.handleSubmit}
        />
      </form>
    </div>
  );
}

function Item(props) {

/*
// IF TRYING TO ADD BACK SQUARE CHECK BOXES, ADD THIS TO FIRST PART OF THE <LI>
// {props.sqVal}

// add the square button:

<button
  className="square"
  onClick={() => props.handleCheckSquare()}
>
{props.sqVal}
</button>


*/
    return (

      <li>
      
        {props.value}

        <button
          className="deletebutton"
          onClick={() => props.handleDeleteItem()}
        > Delete
        </button>
      </li>
    );
}



class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: '',
      squares: [],
      items: [],
      squareX: <h1 className= "xStyle"> X</h1>,

    };


  }


//calls back to API to display new changes to the reminders list (get, put, post, delete, etc.)
  callAPI(){
    fetch('http://localhost:9000/testAPI')
      .then(res => {
        let thing = res.text()
        console.log(thing)
        return thing
      })
      .then(res => {
        let thing = JSON.parse(res);
        console.log("parsed", thing);
        return thing
      })
      .then(res => {
        console.log("setting state to", res)
        this.setState({items:res});

        // this.setState({squares:res.squares});
        console.log(res);
      })
      .catch(err => err)
  }

  componentDidMount(){
    this.callAPI();
  }



//handles the setting of the itemName variable to reflect what the user is
//inputting
  handleInputNewItem(event) {
    console.log(event.target.value)

    //sets the value of itemName to whatever the user has input
    this.setState({itemName: event.target.value});



  }

//handles the submission of a new reminder into the reminders list
  handleSubmit(event) {

    console.log("submitting", this.state.itemName)

    //calls to back end to complete the put method and input a new reminder
    //into the list
    fetch('http://localhost:9000/testAPI', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        //replace with 'newItem'
        'itemName' : this.state.itemName,
      }),
    })
    .then(res => this.callAPI())
    //.then(res => this.setState({itemName:'new'}))

  }

/*

//CODE IN PROGRESS --> ALLOWING ONE TO CHECK SQUARES

  handleCheckSquare(i) {
    const squares = this.state.squares.slice();

    squares[i] = this.state.squareX;
    this.setState({
      squares: squares,

    });

    console.log(squares)
    fetch('http://localhost:9000/testAPI', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        'squares' : squares,
      }),
    })
    .then(res => this.callAPI())

  }

*/


//event handler --> focuses on the deleting of a reminder from the list
  handleDeleteItem(i){

    //makes copy of items list that will be changed and displayed
    const items = this.state.items.slice();

    //sets the value of one item to a specific itemName
    items[i] = this.state.itemName;
    this.setState({
      items: items,
    })

    console.log(items)

    //calls to back end to complete the delete method
    fetch('http://localhost:9000/testAPI', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        //'itemName' : this.state.itemName,
        'item' : this.state.items[i],
      }),
    })
    .then(res => this.callAPI())

  }



  renderItem(i) {
    return (
      <Item
        //sets values referred to in Item function and redirects onEvents
        value={this.state.items[i]}
        handleDeleteItem={() => this.handleDeleteItem(i)}

        key={i}

        /*
        //Only to be used with the other check square code:
        sqVal={this.state.squares[i]}
        handleCheckSquare={() => this.handleCheckSquare(i)}

        */

      />
    );
  }

  render() {

    //Pushes all parts of the Item function into a single array and renders
    let itemList = [];
    console.log(this.state.items)
    for(let i = 0; i < this.state.items.length; i++){
      itemList.push(this.renderItem(i))
    }

    //Creates displayed reminders list
    return (
      <div className="board-row">

          <AddNewItem
            newItem={this.state.itemName}
            handleInputNewItem = {this.handleInputNewItem.bind(this)}
            handleSubmit = {this.handleSubmit.bind(this)}
          />

        <ul>
            {itemList}
        </ul>
      </div>
    );
  }
}




class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <List />
        </div>
        <div className="game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>
      </div>
    );
  }
}

// =============================================================================

export default App;
