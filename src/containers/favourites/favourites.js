import React, { Component } from 'react';
import styled from 'styled-components';
import ReturnToMenu from '../../components/returnToMenu';
import '../../cssFonts/fonts.css';
import HeartIcon from '../../img/user-ico/heart2.png';
import RemoveIcon from '../../img/user-ico/remove-ico.png';
import PlayIcon from '../../img/user-ico/play-button.png';

const Content = styled.div`
    background-color: #2A0E22;
    width: 100vw;
    height: 100%;
    position: absolute;
    z-index: 4;
    display: ${props => props.displayContent};
    flex-direction: column;
    align-items: center;
    `
const Header = styled.div`
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
    display: flex;
    flex-direction: column;
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
    transform: translate(36%, 37%);
    @media (min-width: 500px){
        width: 60px;
        height: 60px;
        transform: translate(33%, 34%);
    }
    `
    //Sounds section
const SoundsBtnSection = styled.div`
    display: ${props => props.displayFavourite};
    flex-direction: column;
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
    display: flex;
    justify-content: space-between;
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
    background: url(${PlayIcon});
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
class Favourites extends Component {
    state = {
        favouriteSounds: [],
        a: 'd'
    }

    hideContent = () => {
        this.props.hideFavourite()
    }

    componentDidMount() {
        fetch('/api/getFavouritesSounds')
        .then(res => res.json())
        .then(json => {
            this.setState({
                favouriteSounds: json.favouriteSounds
            })
        })
    }

    // remove a favourite element
    removeEl = (index) => {
        console.log('click')
        console.log(index)
        console.log(this.state.favouriteSounds)
        
       this.state.favouriteSounds.splice(index, 1)
       this.setState({
        a: 'sa'
    })
    }

    render() {
        const {favouriteSounds} = this.state;
        return (
            <Content displayContent={this.props.showFavourites?'flex':'none'}>
                <Header>
                    <ReturnToMenu hideSettings={this.hideContent}>
                    </ReturnToMenu>
                    <FavouriteMainText>Ulubione</FavouriteMainText>
                </Header>
                <MainSection>
                    <HeartSection><HeartIco></HeartIco></HeartSection>
                    <SoundsBtnSection displayFavourite={this.props.isAuth?'flex':'none'}>
                            {favouriteSounds.map((el, index) => {
                                return(
                                    <SoundBtn key={index}>
                                        <RemoveSound onClick={() => this.removeEl(index)}>

                                        </RemoveSound>
                                        <TextSound>
                                        {el}
                                            
                                        </TextSound>
                                        <PlaySound>

                                        </PlaySound>
                                    </SoundBtn>
                                )   
                            })}
                            <EmptyArrayText display={favouriteSounds.length === 0?'inline':'none'}>Nie posiadasz ulubionych dzwięków</EmptyArrayText>
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