import React, {Component} from 'react';
import '../App.css';
import {displays} from '../arrayDisplays/arrayDisplays';
import {fetchDog} from '../Actions/Actions';
import {connect} from 'react-redux';

class App extends Component {

    state = {
        logo: '',
        input: '',
        money: '',
        display: '',
        active: false
    }

    componentDidMount() {
        this.props.dispatch(fetchDog())
    }

    handleClickOnLink = (display) => {
        this.setState(() => {
            return {
                logo: displays[display.id].logo,
                display: displays[display.id]
                }
            }
        )
    }

    onInputChange = (e) => {
        this.setState({
               input: e.target.value
        })
    }

    createChangeMoney = (name) => () => {
        const currentState = this.state.active;
        this.setState(() => {
            return {
                money: name,
                active: !currentState
            }
        })
    }
    

    render() {
        console.log(this.props.app);
        const myObj = {};
        Array.from(this.props.payload).map(ur => {
            myObj[ur.ccy] = ur.sale;
            console.log('myObj', myObj);
            return myObj;
        });
        const valCoinsArray = [];
        for (let coinVal in this.props.payload) {
             valCoinsArray.push(Object.values(this.props.payload[coinVal]));
        }

        const newDisplays =  displays.map(display => {
            display.uah = (myObj.BTC * myObj.USD).toFixed(2);
            display.usd = parseFloat(myObj.BTC).toFixed(2);
            display.rub = (myObj.BTC * (myObj.USD / myObj.RUR)).toFixed(2);
        });



        const { money, input, logo,  display} = this.state;
        const shouldRenderFinalResult = [money, input, logo,  display].every(item => !!item );

        const allParamForDisplay = () => {
            for(let i = 0; i <= displays.length - 1; ++i) {
                console.log('displaysINFOR', displays[i]);
                    displays[i].valCoinsArray = valCoinsArray[i];
            }
          return displays;
        }

       const allParamForDisplayVal = allParamForDisplay();
       

        return (
            <div className="App">
                <div className='info'>
                    {console.log('allParamForDisplayVal', allParamForDisplayVal)}
                    { allParamForDisplayVal.map ((display) => (
                        <div className='container' onClick={() => this.handleClickOnLink(display)} key ={display.id}>
                            <div className='left'>
                                <div className='logo'>
                                    {console.log('display', display[5])}
                                    <img src={display.img} />
                                    <p>{display.logo}</p>
                                    <div className='right'>
                                            <div className='text'>
                                                <p>UAH : {display.valCoinsArray ? display.valCoinsArray[0]: "Loading"}</p>
                                                <p>USD : {display.valCoinsArray ? display.valCoinsArray[1]: "Loading"}</p>
                                                <p>RUB : {display.valCoinsArray ? display.valCoinsArray[2]: "Loading"}</p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <div className='selected'>
                    <p>Selected coin: {this.state.logo}</p>
                </div>
                <div className='inputValue'>
                    <div className='inputValueText'><p>Volume:</p></div>
                    <div><input type="number" size="60"  onChange={this.onInputChange}/></div>
                </div>
                <div className="money">
                    <button className={this.state.money === 'UAH' ? 'choice': 'no_choice'} onClick={this.createChangeMoney('UAH')} >UAH</button>
                    <button className={this.state.money === 'USD' ? 'choice': 'no_choice'} onClick={this.createChangeMoney('USD')} >USD</button>
                    <button className={this.state.money === 'RUB' ? 'choice': 'no_choice'} onClick={this.createChangeMoney('RUB')} >RUB</button>
                </div>
                <div className='result'>
                    {shouldRenderFinalResult ? <p>
                            <span>{this.state.input} {this.state.logo}</span> will be <span>{this.state.input * this.state.display[this.state.money.toLowerCase()]}</span> in <span>{this.state.money}</span>
                        </p> : <div></div>}
                </div>
            </div>
        );

    }


}

// export default connect(state => state.app)(App);
export default App;
