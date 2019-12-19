import React from 'react';
import ReactDOM from 'react-dom';
import Ms from 'pretty-ms';
import './App.css';

//variables
let buttonvalue = 0;

function SaveStoryBtns(props) {
    console.log("save story btns working")
    return (

        <button
          className="saveStoryBtn"
        > Story # {props.btnsValue}
        </button>

    );
}

//CREATES THE TIMER AT THE TOP RIGHT HAND OF THE SCREEN
function Time(props) {
  //console log statements --> checking to see that everything is operating properly
  console.log("timerhit0 is operating", );
  console.log("this is the time", props.time);

  //if time reaches 0, then reset the timer back to its original number and submit the user's inputted text
  if(props.time >= 0) {
      console.log("if statement worked");
      props.handleSubmit()
      props.resetTimer()
  }

//creates that timer at the top right section of the page
  return (
    <h3
    id= "timerID"
    >
      timer: {Ms(props.time)}
    </h3>
  );
}

//displays uploaded story
function Text(props) {
  console.log("Text function is running", props.text);

  //displays uploaded story
  return (
    <div>
      <p
        id = "textpara"
      >
        {props.text}
      </p>

    </div>
  );

}

//Creates the text area that allows new text to be added to the story
function AddNewText(props) {

  //Code creates the text area at the bottom of the screen that allows the user
  //to input text and submit it into the database
  //<textarea> code partially copied from https://stackoverflow.com/questions/20833761/creating-a-large-textbox-to-get-a-paragraph-input
  return (

    <div>

      <textarea
        name="paragraph_text"
        cols="150"
        rows="5"

        type="text"
        value={props.newStory}
        onChange = {props.handleInputNewStory}
      >

      </textarea>

    </div>
  );
}


//______________________________________________________________________________
//START OF GAME CLASS

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {


      input: "",
      story: [],
      charactercheck: "",
      highlighted: "",
      unhighlighted: "",
      hide: true,

      //for timer
      time: -6000,
      start: 0,
      isOn: false,
      toDisplay: 'timer',

      //save function
      buttons: [],
      savedStories: [],
      constantSS: [],

    };
    //for timer
    this.startTimer = this.startTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)


  }

/*
  firstLoad(){
    fetch('http://localhost:9000/testAPI')
      .then(res => {
        let sendingtasks = [];
        for(let i=0; i < res.length; i++) {
          sendingtasks.push(res[i].storysection)

        }
        console.log('sending:', sendingtasks);
        return sendingtasks
      })
      .then(res => {
        let thing = res.text()
        console.log("THING value is: ", thing)
        return thing
      })
      .then(res => {
        let thing = JSON.parse(res);
        console.log("parsed", thing);
        return thing
      })
      .then(res => {
        //console.log("setting state to", res)
        console.log("setting state to RES:", res)
        console.log("setting state to RES:", res)

        //resvar = res;
        //this.setStoryState()

        //hidden story vs shown story
        this.setState({
          story: res,
          //savedStories: res,
          //savedStories: this.state.constantSS,
          //savedStories: res,
          // constantSS: this.state.constantSS.push(this.state.charactercheck),
          charactercheck: "",

          unhighlighted: "",
          highlighted: "",

        })
        //console logs
        console.log("BEFORE unhighlighted:", this.state.unhighlighted);
        console.log("BEFORE charactercheck", this.state.charactercheck);
        console.log("BEFORE highlighted:", this.state.highlighted);


        //setting charactercheck
        for(let i = 0; i < this.state.story.length; i++) {

          this.setState({charactercheck: this.state.charactercheck + this.state.story[i]})
          console.log("this is the charactercheck:", this.state.charactercheck);
        }

        //INFINITE LOOP --> SOLVE
        //creating substrings to set everything except the last ~40 characters to "X"

        if(this.state.charactercheck.length > 40){
          for(let i = 0; i < this.state.charactercheck.length; i += this.state.charactercheck.length - 40){

             for(let i=0; i<this.state.charactercheck.length; i++) {

               this.setState({highlighted: this.state.highlighted + "X "})
             }

             //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
             this.setState({unhighlighted: this.state.charactercheck.substring(i, this.state.charactercheck.length)})

          }
        }


        //console logs
        console.log("unhighlighted:", this.state.unhighlighted);
        console.log("highlighted length:", this.state.highlighted.length);
        console.log("highlighted:", this.state.highlighted);

        console.log("VALUE OF constantSS", this.state.constantSS)
        this.setState({
          //story: res.sendingtasks,
          constantSS: this.state.constantSS.push(this.state.charactercheck),
          story: res,
          //savedStories: res.sendingSS,
          //hide: true,
          //savedStories: res,
          //savedStories: this.state.constantSS,
        });
        console.log("VALUE OF constantSS", this.state.constantSS)

      //console logs
      console.log("THIS IS THE EDITED STORY: ", this.state.story);
      console.log("THIS IS THE SAVED STORY VALUE:", this.state.savedStories)
      console.log(res);
    })
    .catch(err => err)
  }

  */

/*
  firstLoad(){
    fetch('http://localhost:9000/testAPI')
      .then(res => {
        let thing = res.found.text()
        console.log("the value of thing", thing)
        return thing

      })
      .then(res => {
        let thing = JSON.parse(res);
        console.log("parsed", thing);
        return thing
      })
      // .then(res => {
      //   //console.log("setting state to", res)
      //   console.log("setting state to RES:", res.found)
      //   // console.log("setting state to RES:", res)
      //
      //   //let thing = res.sendingtasks.text()
      //   let sendingtasks = ["hello is this working"];
      //   for(let i=0; i < res.length; i++) {
      //     sendingtasks.push(res[i].storysection)
      //
      //   }
      //   console.log("new sendingtasks", sendingtasks)
      //   return sendingtasks
      //   // let thing = sendingtasks.text()
      //   // console.log("the value of thing", thing)
      //   // return thing
      //
      // })
      .then(res => {

        console.log("res AFTER sendingtasks:", res)



        //resvar = res;
        //this.setStoryState()

        //hidden story vs shown story
        this.setState({
          story: res,
          //savedStories: res,
          //savedStories: this.state.constantSS,
          //savedStories: res,
          // constantSS: this.state.constantSS.push(this.state.charactercheck),
          charactercheck: "",

          unhighlighted: "",
          highlighted: "",

        })
        //console logs
        console.log("BEFORE unhighlighted:", this.state.unhighlighted);
        console.log("BEFORE charactercheck", this.state.charactercheck);
        console.log("BEFORE highlighted:", this.state.highlighted);


        //setting charactercheck
        for(let i = 0; i < this.state.story.length; i++) {

          this.setState({charactercheck: this.state.charactercheck + this.state.story[i]})
          console.log("this is the charactercheck:", this.state.charactercheck);
        }

        //INFINITE LOOP --> SOLVE
        //creating substrings to set everything except the last ~40 characters to "X"

        if(this.state.charactercheck.length > 40){
          for(let i = 0; i < this.state.charactercheck.length; i += this.state.charactercheck.length - 40){

             for(let i=0; i<this.state.charactercheck.length; i++) {

               this.setState({highlighted: this.state.highlighted + "X "})
             }

             //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
             this.setState({unhighlighted: this.state.charactercheck.substring(i, this.state.charactercheck.length)})

          }
        }


        //console logs
        console.log("unhighlighted:", this.state.unhighlighted);
        console.log("highlighted length:", this.state.highlighted.length);
        console.log("highlighted:", this.state.highlighted);

        console.log("VALUE OF constantSS", this.state.constantSS)
        this.setState({
          //story: res.sendingtasks,
          constantSS: this.state.constantSS.push(this.state.charactercheck),
          story: res,
          //savedStories: res.sendingSS,
          //hide: true,
          //savedStories: res,
          //savedStories: this.state.constantSS,
        });
        console.log("VALUE OF constantSS", this.state.constantSS)

      //console logs
      console.log("THIS IS THE EDITED STORY: ", this.state.story);
      console.log("THIS IS THE SAVED STORY VALUE:", this.state.savedStories)
      console.log(res);
    })
    .catch(err => err)
  }
*/



//ORIGINAL




/*

firstLoad(){
  fetch('http://localhost:9000/testAPI')
    .then(res => {
      return res.text()
    })
    .then(res => {
      let thing = JSON.parse(res);
      console.log("parsed", thing);
      return thing
    })
    .then(res => {
      //console.log("setting state to", res)
      console.log("setting state to RES:", res.found)
      // console.log("setting state to RES:", res)

      //let thing = res.sendingtasks.text()
      let sendingtasks = ["hello is this working"];
      for(let i=0; i < res.found.length; i++) {
        sendingtasks.push(res[i].found)
        //sendingtasks.push(res[i].storysection)
      }
      console.log("new sendingtasks", sendingtasks)
      return sendingtasks
      // let thing = sendingtasks.text()
      // console.log("the value of thing", thing)
      // return thing

    })
    .then(sendingtasks => {

      console.log("res AFTER sendingtasks:", sendingtasks)



      //resvar = res;
      //this.setStoryState()

      //hidden story vs shown story
      this.setState({
        story: sendingtasks,
        //savedStories: res,
        //savedStories: this.state.constantSS,
        //savedStories: res,
        // constantSS: this.state.constantSS.push(this.state.charactercheck),
        charactercheck: "",

        unhighlighted: "",
        highlighted: "",

      })
      //console logs
      console.log("BEFORE unhighlighted:", this.state.unhighlighted);
      console.log("BEFORE charactercheck", this.state.charactercheck);
      console.log("BEFORE highlighted:", this.state.highlighted);


      //setting charactercheck
      for(let i = 0; i < this.state.story.length; i++) {

        this.setState({charactercheck: this.state.charactercheck + this.state.story[i]})
        console.log("this is the charactercheck:", this.state.charactercheck);
      }

      //INFINITE LOOP --> SOLVE
      //creating substrings to set everything except the last ~40 characters to "X"

      if(this.state.charactercheck.length > 40){
        for(let i = 0; i < this.state.charactercheck.length; i += this.state.charactercheck.length - 40){

           for(let i=0; i<this.state.charactercheck.length; i++) {

             this.setState({highlighted: this.state.highlighted + "X "})
           }

           //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
           this.setState({unhighlighted: this.state.charactercheck.substring(i, this.state.charactercheck.length)})

        }
      }


      //console logs
      console.log("unhighlighted:", this.state.unhighlighted);
      console.log("highlighted length:", this.state.highlighted.length);
      console.log("highlighted:", this.state.highlighted);

      console.log("VALUE OF constantSS", this.state.constantSS)
      this.setState({
        //story: res.sendingtasks,
        constantSS: this.state.constantSS.push(this.state.charactercheck),
        story: sendingtasks,
        //savedStories: res.sendingSS,
        //hide: true,
        //savedStories: res,
        //savedStories: this.state.constantSS,
      });
      console.log("VALUE OF constantSS", this.state.constantSS)

    //console logs
    console.log("THIS IS THE EDITED STORY: ", this.state.story);
    console.log("THIS IS THE SAVED STORY VALUE:", this.state.savedStories)
    console.log(sendingtasks);
  })
  .catch(err => err)
}

*/

  //WORKING CALLAPI, DONT TOUch

  firstLoad(){
    fetch('http://localhost:9000/testAPI')
      .then(res => {
        let thing = res.text()
        console.log("the value of thing", thing)
        return thing
      })
      .then(res => {
        let thing = JSON.parse(res);
        console.log("parsed", thing);
        return thing
      })
      .then(res => {

        console.log("res AFTER sendingtasks:", res)



        //resvar = res;
        //this.setStoryState()

        //hidden story vs shown story
        this.setState({
          story: res,
          //savedStories: res,
          //savedStories: this.state.constantSS,
          //savedStories: res,
          // constantSS: this.state.constantSS.push(this.state.charactercheck),
          charactercheck: "",

          unhighlighted: "",
          highlighted: "",

        })
        //console logs
        console.log("BEFORE unhighlighted:", this.state.unhighlighted);
        console.log("BEFORE charactercheck", this.state.charactercheck);
        console.log("BEFORE highlighted:", this.state.highlighted);


        //setting charactercheck
        for(let i = 0; i < this.state.story.length; i++) {

          this.setState({charactercheck: this.state.charactercheck + this.state.story[i]})
          console.log("this is the charactercheck:", this.state.charactercheck);
        }

        //INFINITE LOOP --> SOLVE
        //creating substrings to set everything except the last ~40 characters to "X"

        if(this.state.charactercheck.length > 40){
          for(let i = 0; i < this.state.charactercheck.length; i += this.state.charactercheck.length - 40){

             for(let i=0; i<this.state.charactercheck.length; i++) {

               this.setState({highlighted: this.state.highlighted + "X "})
             }

             //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
             this.setState({unhighlighted: this.state.charactercheck.substring(i, this.state.charactercheck.length)})

          }
        }


        //console logs
        console.log("unhighlighted:", this.state.unhighlighted);
        console.log("highlighted length:", this.state.highlighted.length);
        console.log("highlighted:", this.state.highlighted);

        console.log("VALUE OF constantSS", this.state.constantSS)
        this.setState({
          //story: res.sendingtasks,
          constantSS: this.state.constantSS.push(this.state.charactercheck),
          story: res,
          //savedStories: res.sendingSS,
          //hide: true,
          //savedStories: res,
          //savedStories: this.state.constantSS,
        });
        console.log("VALUE OF constantSS", this.state.constantSS)

      //console logs
      console.log("THIS IS THE EDITED STORY: ", this.state.story);
      console.log("THIS IS THE SAVED STORY VALUE:", this.state.savedStories)
      console.log(res);
    })
    .catch(err => err)
  }




  callAPIaftersave(){
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
        //console.log("setting state to", res)

        console.log("WHAT IS THE REST OF APIAFTERSAVE:", res)
        //constantSS = res;
        //resvar = res;
        //this.setStoryState()

        //hidden story vs shown story
        this.setState({

          //UNDUE CONSTANTSS STUFF IF THIS DOESNT WORK
          //constantSS: res,
          savedStories: res,

        })

      //console logs
      //console.log("THIS IS THE EDITED STORY: ", this.state.story);
      console.log("callAPIaftersave, THIS IS THE SAVED STORY VALUE:", this.state.savedStories)

    })
    .catch(err => err)
  }


  callAPIafterdelete(){
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
        //console.log("setting state to", res)

        console.log("setting state to RES:", res)

        //resvar = res;
        //this.setStoryState()

        //hidden story vs shown story
        this.setState({
          story: res,
          charactercheck: "",

          unhighlighted: "",
          highlighted: "",

        })
        //console logs
        console.log("BEFORE unhighlighted:", this.state.unhighlighted);
        console.log("BEFORE charactercheck", this.state.charactercheck);
        console.log("BEFORE highlighted:", this.state.highlighted);


        //setting charactercheck
        for(let i = 0; i < this.state.story.length; i++) {

          this.setState({charactercheck: this.state.charactercheck + this.state.story[i]})
          console.log("this is the charactercheck:", this.state.charactercheck);
        }

        //INFINITE LOOP --> SOLVE
        //creating substrings to set everything except the last ~40 characters to "X"

        if(this.state.charactercheck.length > 40){
          for(let i = 0; i < this.state.charactercheck.length; i += this.state.charactercheck.length - 40){

             for(let i=0; i<this.state.charactercheck.length; i++) {

               this.setState({highlighted: this.state.highlighted + "X "})
             }

             //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
             this.setState({unhighlighted: this.state.charactercheck.substring(i, this.state.charactercheck.length)})

          }
        }


        //console logs
        console.log("unhighlighted:", this.state.unhighlighted);
        console.log("highlighted length:", this.state.highlighted.length);
        console.log("highlighted:", this.state.highlighted);


        this.setState({
          story: res,

        });

      //console logs
      console.log("THIS IS THE EDITED STORY: ", this.state.story);
      console.log("THIS IS THE SAVED STORY VALUE:", this.state.savedStories)
      console.log(res);
    })
    .catch(err => err)
  }


  componentDidMount(){
    this.firstLoad();
    // this.setState({
    //   savedStories: this.state.savedStories,
    //
    // })

    this.callAPIaftersave();
  }




//EVENT HANDLERS

//handles the setting of the input variable to reflect what the user is
//inputting
  handleInputNewStory(event) {
    //console.log("NEW HIGHLIGHTED TEST:", this.state.highlighted);
    console.log(event.target.value)

    //sets the value of itemName to whatever the user has input
    this.setState({
      input: event.target.value

    })
  }


  //handles the submission of a new story section into the final piece
  handleSubmit(event) {

    //console logs
    console.log("submitting", this.state.input)

    /*
    calls to back end to complete the put method and input a story section
    into the back end
    */
      fetch('http://localhost:9000/testAPI', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
          //replace with 'newItem'
          'input' : this.state.input,
          'charactercheck' : this.state.charactercheck,
          'highlighted' : this.state.highlighted,
          'unhighlighted' : this.state.unhighlighted,
          //'charactercheck' this.state.charactercheck,
        }),
      })
      .then(res => {
        console.log("the res is:", res);
        //this.callAPI()
        //this.callAPI()
        this.firstLoad()

      })
      // .then(res => {
      //   console.log("the res is:", res);
      //   //this.callAPI()
      //   this.callSubmitAPI()
      //
      //
      // })
      .then(res => {
        console.log("the res is:", res);
        //this.callAPI()
        //this.setStoryState()

      })
      .then(res => this.setState({input:""}))
    //}
    }

//PROBLEM IS WITH HANDLESAVE --> FIX
    handleSave(i){
      // const savedStories = this.state.savedStories.slice();

      // console.log("FIRST HANDLE SAVE CHECK", this.state.charactercheck)




      // savedStories.push(this.state.charactercheck);
      //if(this.state.charactercheck !== null) {

      //}
      // this.setState({
      //   savedStories: ""
      // })
      // this.setState({
        // savedStories: savedStories,
        //savedStories: this.state.savedStories.push(this.state.charactercheck),

      // })
      // console.log("variablecheck HANDLE SAVE CHECK", savedStories)
      // console.log("SECOND HANDLE SAVE CHECK", this.state.savedStories)


      console.log("submitting CHARCHECK!!", this.state.charactercheck)
      //console.log("submitting CHARCHECK!!", this.state.constantSS)

      fetch('http://localhost:9000/testAPI', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
          //replace with 'newItem'
          //'savedStories' : this.state.savedStories,
          'charactercheck' : this.state.charactercheck,
          //'constantSS' : this.state.constantSS,
        }),
      })
      .then(res => {
        console.log("HANDLE SAVE, the res is:", res);
        this.callAPIaftersave()
        //this.firstLoad()


      })
      .then(res => {
        console.log("THE value OF the SAVED stories", this.state.savedStories)

        //console.log("the res is:", res);
        //this.firstLoad()

      })
      //.then(res => this.setState({input:""}))
    }


    //handles delete function
    handleDeleteItem(i){

      //makes copy of items list that will be changed and displayed
      const story = this.state.story.slice();

      this.setState({
        story: [],
        hide: true,
      })


      //console log
      console.log(story)

      //calls to back end to complete the delete method
      fetch('http://localhost:9000/testAPI', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
          'story' : this.state.story/*[i]*/,
        })
      })
      .then(res => {
        console.log("emptying state")
        //this.callAPI()
        //this.firstLoad()
        this.callAPIafterdelete()
        //changes and sets the current state of certain variables (story and hide)
        // this.setState({
        //   story: [],
        //   hide: true,
        // })
      })
    }

    //reveals the entire story when "reveal" button is pressed
    handleReveal(i){
      this.setState({
        hide: false,
      })
    }


//______________________________________________________________________________
  //Timer

//TIMER CODE PARTIALLY COPIED FROM THIS "MEDIUM" ARTICLE: https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553
  startTimer() {

    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })


    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start,

    }), 1);

  }


//TIMER CODE PARTIALLY COPIED FROM THIS "MEDIUM" ARTICLE: https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553
  resetTimer() {
    clearInterval(this.timer)
    this.setState({isOn:false})
    this.setState({time: -6000})
    // this.completeTimerReset()

  }

  // completeTimerReset() {
  //   this.setState({isOn:false})
  //   this.setState({time: -6000})
  // }

  renderBtn(i){
    return(
      <SaveStoryBtns
        //btnsValue={this.state.buttons[i]}
        btnsValue={i + 1}
        //key={i}


      />
    );
  }



  render(){

      //console log
      console.log("timer is working");




//TIMER CODE PARTIALLY COPIED FROM THIS "MEDIUM" ARTICLE: https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553

//change to pos.
      let start = (this.state.time === -6000) ?
        <button
        //onClick={() => this.handleSubmit()}
        onClick={this.startTimer}
        className="startBtn"

        >
        Start
        </button> :
        null

        let buttonNmbr = [];
        console.log("value of SAVED STORIES: ", this.state.savedStories)
        for(let i = 0; i < this.state.savedStories.length; i++){
          buttonNmbr.push(this.renderBtn(i))
          //this.state.buttons.push(this.renderBtn())
          //setState({buttons: this.state.buttons.push(this.renderBtn(i))})

          //this.setState({buttons: this.state.buttons.push(i)})
          buttonvalue = buttonNmbr[i];
          console.log("BUTTON VALUE IS:", buttonvalue)
        }


/*
      let numberofbuttons = (this.state.buttons === true) ?
        <Text
          //text={this.state.story}
          text={this.state.highlighted + this.state.unhighlighted}

        /> :
        <Text

          text={this.state.story}

        />
*/
        let hiddenText = (this.state.hide === true) ?
          <Text
            //text={this.state.story}
            text={this.state.highlighted + this.state.unhighlighted}

          /> :
          <Text

            text={this.state.story}

          />


        return(


        <div className="game">



            <div className="dropdown">
              <button className="dropbtn">Saved Stories</button>
              <div className="dropdown-content">
                {buttonNmbr}
                {/*this.state.buttons*/}

              </div>
            </div>


            <Time
              handleSubmit = {this.handleSubmit.bind(this)}
              //handleSumbit={() => this.handleSubmit.bind(this)}
              //resetTimer = {this.handleSubmit.bind(this)}
              resetTimer={() => this.resetTimer()}
              time={this.state.time}

            />



          <div
            className="frontendstory"
          >
            {hiddenText}


          </div>

          <div
            id="newtextandfooter"
          >
            <AddNewText
              newStory={this.state.input}
              handleInputNewStory = {this.handleInputNewStory.bind(this)}
              handleSubmit = {this.handleSubmit.bind(this)}
            />

            <button

              onClick={() => this.handleDeleteItem()}
              className="deleteBtn"

            >
              Delete Story

            </button>

            {start}

            <button

              onClick={() => this.handleSave()}
              className="saveBtn"

            >
              Save Story

            </button>

            <button

              onClick={() => this.handleReveal()}
              className="doneBtn"

            >
              Reveal Story

            </button>

          </div>

        </div>

      );
  }

}


class App extends React.Component {
  render() {
    return (
      <div className="App">



        <h1>Exquisite Corpse</h1>
        <h3>- an interactive writing game -</h3>
        <Game />

      </div>
    );
  }
}

/*

<div className="App">

  <div className="dropdown">
    <button className="dropbtn">Dropdown</button>
    <div className="dropdown-content">
      {buttonNmbr}

    </div>
  </div>


<button>Link 1</button>
<button>Link 2</button>
<button>Link 3</button>
*/

// =============================================================================
export default App;
