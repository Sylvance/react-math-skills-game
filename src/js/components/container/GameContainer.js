import React, { Component } from "react"

import Message from "../presentational/Message"
import Number from "../presentational/Number"
import "../styling/GameContainer.css"

class GameContainer extends Component {
  constructor() {
    super()
    let numbersArray = Array.from(Array(10).keys())
    numbersArray.shift()
    this.state = {
      numbers: numbersArray,
      currentTotal: 0,
      clickedValues: [],
      numberOfStars: 0,
      message: '',
      redraws: 5,
      gamestate: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRedraw = this.handleRedraw.bind(this)
    this.handleComparison = this.handleComparison.bind(this)
  }

  componentWillMount(){
    let numbers = this.state.numbers
    this.setStarsState(1,9)
    this.setNumbersState(numbers)
  }

  setStarsState(min, max){
    let starsNo = this.generateRandomStars(min, max)
    this.setState({numberOfStars: starsNo})
  }

  setNumbersState(numbers){
    let numbersDict = {}
    numbers.forEach((element) => {
        numbersDict['btn-'+element.toString()] = false
    })
    this.setState(numbersDict)
  }

  generateRandomStars(min, max){
    return Math.floor(Math.random() * max) + min
  }

  checkWin(numbers){
    let flags = []
    let flag
    numbers.forEach((element) => {
        let elementValue = this.state['btn-'+element.toString()]
        flags.push(elementValue.toString())
    })
    if (flags.includes('false')) {
        flag = false
    } else {
        flag = true
    }
    return flag
  }

  setTotalToZero(){this.setState({currentTotal: 0})}

  setMessage(message){this.setState({message: message})}

  redraw() {
    this.setStarsState(1,9)
    this.setTotalToZero()
  }

  handleRedraw(redraws){
    if (redraws > 0){
      this.setState({redraws: redraws-1})
      this.redraw()
      this.setState({message: ""})
    } else{
      console.log("Redraws finished")
      this.setState({message: "Redraws finished"})
    }
  }

  handleClick(event) {
    const value = parseInt(event.target.value)
    let change = value
    let lastTotal = parseInt(this.state.currentTotal)
    let lastBool = this.state[event.target.id]
    let lastClicked = this.state.clickedValues
    if(!lastBool){
        change = -value
    }
    if(lastClicked.includes(value)){
        lastClicked.push(value)
    } else {
        lastClicked.push(value)
    }
    this.setState({ 
        [event.target.id]: !lastBool,
        clickedValues: lastClicked,
        currentTotal: lastTotal - change
    })
  }

  toggleButton(id) {
    let toggledDict = {}
    toggledDict["disable-"+id] = !this.state[id]
    this.setState(toggledDict)
  }

  handleComparison() {
    const { redraws, numbers, currentTotal, numberOfStars } = this.state
    if (currentTotal === numberOfStars) {
        this.setMessage("Yeeeei! Good work")
        this.redraw()
    } else {
        this.setMessage("Try again!")
        this.redraw()
    }
    
    if (this.checkWin(numbers)) {
        this.setMessage("You just won!")
        this.setState({gamestate: 1})
    } else if (redraws === 0){
        this.setMessage("Game over!")
    } else{
        return null
    }
  }

  render() {
    const { redraws, numbers, numberOfStars, currentTotal } = this.state
    let numbersElement = numbers.map((number) =>
        <Number
            key={number.toString()}
            type="button"
            id={number.toString()}
            value={number}
            disabled={this.state["disable-"+number.toString()]}
            handleClick={this.handleClick}
        />
    )
    let starsElement = [...Array(numberOfStars).keys()].map((number) =>
        <li key={number.toString()} className="star-five" id={"item-"+number}>
            <i className="fa fa-star"></i>
        </li>
    )
    return (
      <div id="game">
        <div className="wrapped">
            <div className="item header">
                <h2>Math Skill Game</h2>
            </div>
            <div className="item sidebar status-area">
                <h4>Result</h4>
                <Message message={this.state.message ? this.state.message : "-"} />
            </div>
            <div className="item content-1 stars-area">
                <ul>{starsElement}</ul>
            </div>
            <div className="item content-2 buttons-area">
                <h5>Redraws remaining</h5>
                <p>{redraws}</p>
                <button type="button" onClick={() => this.handleRedraw(redraws)} className="btn-secondary">Redraw</button>
                <button type="button" onClick={this.handleComparison} className="btn-primary">Check</button>
            </div>
            <div className="item content-3 results-area">
                <h5>Total</h5>
                <p>{currentTotal}</p>
            </div>
            <div className="item footer">
                <ul className="numbers-area">
                    {numbersElement}
                </ul>
            </div>
        </div>
      </div>
    )
  }
}

export default GameContainer
