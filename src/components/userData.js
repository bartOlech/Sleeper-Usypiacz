import React, {Component} from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const UserCnt = styled.div`
    display: ${props => props.visibility};
`
const User = styled.div`
    color: #fff;
    font-weight: 500;
    padding-right: 10px;
`
const FullName = styled.div`
    color: #D2CFDE;
    font-weight: 700;
`

class UserData extends Component{
    state = {
        logged: true,
        getToken: Cookies.get('auth'),
        fullName: Cookies.get('user'),
        isAuthenticated: false,
        user: null
    }

     componentDidMount() {
         if(this.state.getToken){
            //  const tokenBlob = new Blob([JSON.stringify({access_token: this.state.getToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: JSON.stringify({
                userName: this.state.userName
            }),
            mode: 'cors',
            credentials: 'include',
            cache: 'default'
        };
        fetch('/api/facebookk', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
            if (token) {
                this.setState({isAuthenticated: true, user})
                
            }
        });
        }).catch(err =>{console.log(err)})
         }  
  }

    render(){
        const {fullName, getToken, isAuthenticated} = this.state;
        console.log(isAuthenticated)
        return(
            <UserCnt visibility={getToken?'flex':'none'}>
                <User>Witaj </User><FullName>{fullName}</FullName>
            </UserCnt>
        )
    }
}
export default UserData;