import React, {Component} from 'react';
// import styled from 'styled-components';
import '../App.css';

const hideCnt = {
    display: 'none'
}

const fade = {
    opacity: '0.1'
}

const clickedBtnCircle = {
    strokeDashoffset: 0,
    opacity: 1
}
const clickedBtnTriangle = {
    strokeDashoffset: 0,
    opacity: 1,
    stroke: 'rgb(189, 178, 29)'
}

class Sounds extends Component{
    constructor(props){
        super(props)
        this.state = {
            cntIsVisible: false,
            menuBtnIsCheck: false,
            clickedNumberOfButton: null
        }
    }

    clickMoreSounds(){
        this.setState({
            cntIsVisible: true
        })
    }
    
    hideCnt(){
        this.setState({
            cntIsVisible: false
        })
    }

    fadeView(){
        this.setState({
            menuBtnIsCheck: !this.state.menuBtnIsCheck
        })
    }

    playBtn = (val)=>{
        const{clickedNumberOfButton} = this.state;
        return(
            <div className="sounds-playIcoBtn">
                <div className='internal-sounds-playIcoBtn'>
                    <svg
                    x="0px"
                    y="0px"
                    width="43.7px"
                    height="43.7px"
                    viewBox="0 0 213.7 213.7"
                    enableBackground="new 0 0 213.7 213.7"
                    xmlSpace="preserve"
                    >
                    <polygon
                        className="triangle"
                        id="XMLID_18_"
                        fill="none"
                        strokeWidth={7}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        points="
                    73.5,62.5 148.5,105.8 73.5,149.1 "
                        style={clickedNumberOfButton === val?clickedBtnTriangle:null}
                    />
                    <circle
                        className="circle"
                        id="XMLID_17_"
                        fill="none"
                        strokeWidth={8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        cx="108.8"
                        cy="106.8"
                        r="100.3"
                        style={clickedNumberOfButton === val?clickedBtnCircle:null}
                    />
                    </svg>
                </div>
            </div>
        )
    }

    clickSoundBtn = (number)=>{
        const{clickedNumberOfButton} = this.state;
        if(clickedNumberOfButton === number){
            this.setState({
                clickedNumberOfButton: null
            })
        }else{
            this.setState({
                clickedNumberOfButton: number
            })
        }
    }

    render(){
        const{cntIsVisible, menuBtnIsCheck} = this.state;
        return(
            <div style={cntIsVisible?null:hideCnt}>
                <div style={menuBtnIsCheck?fade:null}>
                <div className="wrapperSounds">
                      <button onClick={() => this.clickSoundBtn('1')} className='all-sounds-btn'>
                        {this.playBtn('1')}
                      Example
                      </button>

                      <button onClick={() => this.clickSoundBtn('2')}  className='all-sounds-btn'>
                        {this.playBtn('2')}
                      Example
                      </button>

                      <button onClick={() => this.clickSoundBtn('3')}  className='all-sounds-btn'>
                        {this.playBtn('3')}
                      Example
                      </button>

                      <button onClick={() => this.clickSoundBtn('4')}  className='all-sounds-btn'>
                        {this.playBtn('4')}
                      Example
                      </button>
                </div>
                </div>
            </div>
        )
    }
}
export default Sounds