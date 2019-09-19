import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageActions, alertActions } from '../../actions';
import { history } from '../../helpers';
import Device from '../../css/device';

import Config from '../../config';

const Container = styled.div`
    position: relative;
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 64px);
    font-family: 'Open Sans', sans-serif;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 75px);
    background: #f8fafb;
    padding: 24px 8px;
    overflow-y: auto;
    @media ${Device.laptop} {
        padding: 50px 64px;
    }
`;

const Title = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #1B1E24;
    margin-bottom: 40px;
`;

const PRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    padding: auto;
    width: 100%;
    margin: 10px 0px;
`;

const PAvatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 60px;
    border: 2px solid #E8ECEF;
    background: green;
`;

const PSelectBtn = styled.input`
    width: 150px;
    height: 46px;
    margin-left: 20px;
    background: #FFFFFF;
    border: 1px solid #4D7CFE;
    box-sizing: border-box;
    border-radius: 4px;

    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #4D7CFE;

    &:hover {
        background: #4D7CFE;
        color: #FFFFFF;
    }
`;

const PLabel = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    color: #778CA2;
    height: 52px;
    padding: 21px 10px;
    width: 180px;
    text-align: left;
`;

const PInputBox = styled.input`
    background: #FFFFFF;
    border: 1px solid #E8ECEF;
    box-sizing: border-box;
    border-radius: 4px;
    height: 52px;
    width: 360px;
    padding: 7px 15px;
    transition: border 0.7s;

    &:hover {
        border: 1px solid  #4D7CFE;
    }
`;

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #FFFFFF;
    padding: 13px 20px;
`;

const ActionButton = styled.button`
    width: 186px;
    height: 46px;
    background: #FFFFFF;
    border: 1px solid #778CA2;
    border-radius: 4px;
    margin-left: 20px;
    font-weight: 500;
    font-size: 18px;

    &:hover {
        background: #4D7CFE;
        color: white;
    }
`;

const EditButton = styled.button`
    width: 186px;
    height: 46px;
    margin-left: 180px;
    background: ${props => {
        let color;
        if (props.active) {
            color = "#4D7CFE";
        } else {
            color = "#fe4d4d";
        }
        return color;
    }};
    color: ${props => {
        let color;
        if (props.active) {
            color = "white";
        } else {
            color = "black";
        }
        return color;
    }};
    border: 1px solid #778CA2;
    border-radius: 4px;
    font-weight: 500;
    font-size: 18px;

    &:hover {
        color: black;
        background: #FFFFFF;
    }
`;

export class Profile extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: props.email,
            phonenumber: "",
            address: "",
            editable: false,
            img: "",
            avatar: null,
        };
        this.fileInputRef = React.createRef();

        const { getProfile } = props;
        getProfile(props.username, props.email);
    }

    onChangeInput = (e, type) => {
        if(type === 'firstname')
            this.setState({firstname: e.target.value});
        if(type === 'lastname')
            this.setState({lastname: e.target.value});
        if(type === 'email')
            this.setState({email: e.target.value});
        if(type === 'phonenumber')
            this.setState({phonenumber: e.target.value});
        if(type === 'address')
            this.setState({address: e.target.value});
    }

    backHomepage = () => {
        history.push('/landing');
    }

    saveProfile = () => {
        const { updateProfile, updateAvatar } = this.props;
        const {firstname, lastname, email, phonenumber, address, editable, avatar } = this.state;
        updateProfile({firstname, lastname, email, phonenumber, address, editable });
        if(avatar!==null)
            updateAvatar({email, avatar});
    }

    enableEdit = () => {
        const { editable } = this.state;
        const { userProfile } = this.props;

        if(userProfile !== null)
            this.setState({
                // eslint-disable-next-line react/prop-types
                img: Config.BACKEND_API_URL + userProfile.img,
                firstname : userProfile.firstname,
                // eslint-disable-next-line prefer-destructuring
                lastname : userProfile.lastname,
                // eslint-disable-next-line prefer-destructuring
                email : userProfile.email,
                // eslint-disable-next-line prefer-destructuring
                phonenumber : userProfile.phonenumber,
                // eslint-disable-next-line prefer-destructuring
                address : userProfile.address,
                editable: !editable
            });
    }

    onAvatarChanged = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if(file){
            reader.onloadend = () => {
                this.setState({
                    avatar: file,
                    img: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    }

    openFileDialog = (e) => {
        e.preventDefault();
        const { editable } = this.state;
        
        if(!editable) {
            const { error } = this.props;
            error("Please Press Edit First");
        } else
            this.fileInputRef.current.click();
    }

    render(){
        const { userProfile, requestedProfile, receivedProfile, avatarUpdateRequested, profileUpdateRequsted, profileUpdateSuccess } = this.props;
        let { firstname, lastname, email, phonenumber, address, img } = this.state;
        const { editable } = this.state;
        if( userProfile !== null && !editable){
            
            // eslint-disable-next-line react/prop-types
            img = Config.BACKEND_API_URL + userProfile.img;
            // eslint-disable-next-line prefer-destructuring
            firstname = userProfile.firstname;
            // eslint-disable-next-line prefer-destructuring
            lastname = userProfile.lastname;
            // eslint-disable-next-line prefer-destructuring
            email = userProfile.email;
            // eslint-disable-next-line prefer-destructuring
            phonenumber = userProfile.phonenumber;
            // eslint-disable-next-line prefer-destructuring
            address = userProfile.address;
        }

        return(
            <Container>
                {receivedProfile &&
                <InfoContainer>
                    <Title>
                        User Profile
                    </Title>
                    <PRow>
                        <PLabel>Profile Image</PLabel>
                        <PAvatar src={img}></PAvatar>
                        <PSelectBtn type="file" style={{display: "none"}} ref={this.fileInputRef} onChange= {e => this.onAvatarChanged(e)} />
                        <PSelectBtn type="button" onClick={e => this.openFileDialog(e)} value="Select Photo" />
                    </PRow>
                    <PRow>
                        <PLabel>
                            Email
                        </PLabel>
                        <PInputBox type = "text" value = {email} onChange={e => this.onChangeInput(e, 'email')} disabled/>
                    </PRow>
                    <PRow>
                        <PLabel>
                            First Name
                        </PLabel>
                        <PInputBox type = "text" value = {firstname} onChange={e => this.onChangeInput(e, 'firstname')}/>
                    </PRow>
                    <PRow>
                        <PLabel>
                            Last Name
                        </PLabel>
                        <PInputBox type = "text" value = {lastname} onChange={e => this.onChangeInput(e, 'lastname')}/>
                    </PRow>
                    <PRow>
                        <PLabel>
                            Phone
                        </PLabel>
                        <PInputBox type = "text" value = {phonenumber} onChange={e => this.onChangeInput(e, 'phonenumber')}/>
                    </PRow>
                    <PRow>
                        <PLabel>
                            Address
                        </PLabel>
                        <PInputBox type = "text" value = {address} onChange={e => this.onChangeInput(e, 'address')}/>
                    </PRow>
                    <PRow>
                        {!editable?
                            <EditButton onClick={e=> this.enableEdit(e)} active>Edit</EditButton>
                            :<EditButton onClick={e=> this.enableEdit(e)} inactive>Cancel Edit</EditButton>
                        }                        
                    </PRow>
                </InfoContainer>}
                {requestedProfile&&
                <Title>
                    Loading..
                </Title>}
                {receivedProfile &&
                <ActionContainer>
                    <ActionButton onClick={e=> this.backHomepage(e)}>Cancel</ActionButton>
                    {
                        (!avatarUpdateRequested||(!profileUpdateRequsted&&!profileUpdateSuccess))?
                            <ActionButton onClick={e=> this.saveProfile(e)} >Save</ActionButton>:
                            <ActionButton disabled>Save</ActionButton>    
                    }
                </ActionContainer>}
            </Container>
        );
    }
 
};

Profile.defaultProps = {
    userProfile: null,
};

Profile.propTypes = {
    userProfile: PropTypes.shape({
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        phonenumber: PropTypes.string,
        address: PropTypes.string,
    }),
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    requestedProfile: PropTypes.bool.isRequired,
    receivedProfile: PropTypes.bool.isRequired,
    getProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updateAvatar: PropTypes.func.isRequired,
    avatarUpdateRequested: PropTypes.bool.isRequired,
    profileUpdateRequsted: PropTypes.bool.isRequired,
    profileUpdateSuccess: PropTypes.bool.isRequired,
    error: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        userProfile: state.page.userProfile,
        requestedProfile: state.page.requestedProfile,
        receivedProfile: state.page.receivedProfile,
        avatarUpdateRequested: state.page.avatarUpdateRequested,
        profileUpdateRequsted: state.page.profileUpdateRequsted,
        profileUpdateSuccess: state.page.profileUpdateSuccess,
        email: state.auth.user.email,
        username: state.auth.user.username,
    };
}

const actionCreators = {
    getProfile: pageActions.getProfile,
    updateProfile: pageActions.updateProfile,
    updateAvatar: pageActions.updateAvatar,
    error: alertActions.error,
};

export default connect(mapStateToProps, actionCreators)(Profile);