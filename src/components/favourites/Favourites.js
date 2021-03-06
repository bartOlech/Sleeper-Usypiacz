import React, { Component } from 'react';
import styled from 'styled-components';
import ReturnToMenu from '../ReturnToMenu';
import '../../cssFonts/fonts.css';
import HeartIcon from '../../img/user-ico/heart2.png';
import RemoveIcon from '../../img/user-ico/remove-ico.png';
import PlayIcon from '../../img/user-ico/play-button.png';
import '../../App.css';

// loader
import Loader from 'react-loader-spinner';

const Content = styled.div`
    background-color: #2A0E22;
    width: 100vw;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;
    display: ${props => props.displayContent};
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    `
const Header = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    left: 0;
    `
    // Main text in header
const FavouriteMainText = styled.h2`
    font-family: 'Varela Round', sans-serif;
    color: #E8ECEF;
    margin: 17px 0 0 -158px;

    `
const MainSection = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    `
    // Heart ico in circle section
const HeartSection = styled.div`
    width: 80px;
    height: 80px;
    position: relative;
    border: 2px solid #E8ECEF;
    border-radius: 50%;
    margin-top: 80px;
    @media (min-width: 500px){
        width: 100px;
        height: 100px;
    }
    `
const HeartIco = styled.div`
    width: 45px;
    height: 45px;
    background: url(${HeartIcon});
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform: translate(36%, 37%);
    -ms-transform: translate(36%, 37%);
    transform: translate(36%, 37%);
    @media (min-width: 500px){
        width: 60px;
        height: 60px;
        -webkit-transform: translate(33%, 34%);
        -ms-transform: translate(33%, 34%);
        transform: translate(33%, 34%);
    }
    `
    //Sounds section
const SoundsBtnSection = styled.div`
    display: ${props => props.displayFavourite};
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 30px;
    `
const SoundBtn = styled.div`
    width: 70vw;
    max-width: 300px;
    height: 40px;
    background: #2A0E22;
    border: 2px solid #E8ECEF;
    border-radius: 6px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 20px;
    `
    // Remove sound
const RemoveSound = styled.button`
    width: 20px;
    height: 20px;
    background: url(${RemoveIcon});
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    margin-left: 6px;
    outline: 0;
    cursor: pointer;
    `
    // Text sound
const TextSound = styled.h3`
    font-family: 'Varela Round', sans-serif;
    color: #E8ECEF;
    `
    // Play sound
const PlaySound = styled.button`
    width: 28px;
    height: 28px;
    background: url(${props => props.playIco});
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    margin-right: 6px;
    outline: 0;
    cursor: pointer;
    `
// unathorized info text
const AuthInfoText = styled.h2`
    display: ${props => props.isAuth};
    color: #E8ECEF;
    padding-top: 30px;
    font-family: 'Varela Round', sans-serif;
    text-align: center;
    `
const EmptyArrayText = styled.h2`
    display: ${props => props.display};
    color: #E8ECEF;
    padding-top: 30px;
    font-family: 'Varela Round', sans-serif;
    text-align: center;
    `
    // loader
const LoaderCnt = styled.div`
    display: ${props => props.display};
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 65px;
    `
const LoaderSection = styled.div`
    display: ${props => props.display};
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    `

class Favourites extends Component {
    state = {
        favouriteSounds: this.props.favouriteSounds,
        playSound: false
    }

    hideContent = () => {
        this.props.hideContent()
    }

    componentDidMount() {
        
    }

    // remove a favourite element
    removeEl = (index, el) => {
    // Remove a sound from database
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            soundName: el,
            soundNamePl: this.props.favouriteSoundsPl[index]
        }),
        mode: 'cors',
    };
    fetch('https://noizze.pl/noizzeserver/removeFromFavourite', options).then(res => res.json()).then(json => {
        
    }).catch(err => console.log(err))
    this.props.removeFavEl(index, el)
    }

    // Play a sound from the favourite component
    playSoundFromFavourite = (index, el) => {
        this.setState({
            playSound: !this.state.playSound
        }, () => {
            this.props.playSoundFromFavourite(index, this.state.playSound)
        }) 
    }

    render() {
        return (
            <Content displayContent={this.props.favouritesSectionIsVisible?'flex':'none'}>
            
                <Header>
                    <ReturnToMenu hideSettings={this.hideContent}>
                    </ReturnToMenu>
                    <FavouriteMainText>Ulubione</FavouriteMainText>
                </Header>
                <MainSection>
                    <HeartSection><HeartIco></HeartIco></HeartSection>
                    <LoaderSection display={this.props.isAuth  ? 'flex' : 'none'}>
                        <LoaderCnt display={this.props.loadedFavouritesEl  ? 'none' : 'flex'}>
                            <Loader
                                type="ThreeDots"
                                color="#E8ECEF" 
                                height="70"
                                width="100"
                            />
                        </LoaderCnt>
                    </LoaderSection>
                    
                    <SoundsBtnSection displayFavourite={this.props.isAuth?'flex':'none'}>
                            {this.props.favouriteSounds.map((el, index) => {
                                return(
                                    <SoundBtn key={index}>
                                        <RemoveSound onClick={() => this.removeEl(index, el)}>

                                        </RemoveSound>
                                        <TextSound>
                                            {this.props.favouriteSoundsPl[index]}  
                                        </TextSound>
                                        <PlaySound 
                                            playIco={PlayIcon}
                                            onClick={() => this.playSoundFromFavourite(index, el)}>
                                        </PlaySound>
                                    </SoundBtn>
                                )   
                            })}
                            <EmptyArrayText 
                                display={this.props.favouriteSounds.length === 0 && this.props.loadedFavouritesEl?'inline':'none'}>
                                Nie posiadasz ulubionych dzwięków
                            </EmptyArrayText>
                    </SoundsBtnSection>
                    <AuthInfoText isAuth={this.props.isAuth?'none':'flex'}>
                        Nie jesteś zalogowany
                    </AuthInfoText>
                </MainSection>
                
            </Content>
        )
    }
}

export default Favourites;