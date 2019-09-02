import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ec4535',
        },
        primary: {
            main: "#32CD32",
        },
        accent: {
            backgroundColor: "#ec4535", // import purple doesnt work
            color: '#000',
        },
    },
});

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

const ShipmentItem = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #444;
    padding: 5px 0px;
`;

const ShipmentItemRow = styled.div`
    display: flex;
    flex-direction: row;
    font-familiy: 'Rubik';
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
`;

const IDLabel = styled.h1`
    flex: 1;
    align-items: center;
    font-style: normal;
    font-size: 15px;
    color: #000;
`;

const VendLabel = styled.h1`
    align-items: center;
    font-style: normal;
    font-size: 15px;
    color: #55f;
`;

const ShipmentProgressRow = styled.div`
    display: flex;
    flex-direction: column;
    font-familiy: 'Rubik';
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
`;

const ItemLocation = styled.h1`
    font-size: 14px;
    color: black;
    flex: 1;
`;

const ShipmentTypeItem = styled.div`
    display: flex-end;
`;

const CommitLabel = styled.h1`
    font-size: 14px;
    color: black;
    font-weight: 500;
`;

const data = [
    {
        id: 283,
        completed: "100",
    },
    {
        id: 284,
        completed: "70",
    },
    {
        id: 285,
        completed: "20",
    },
    {
        id: 295,
        completed: "50",
    },
];

class ShipmentDashboardItem extends React.Component {
    state = {
        playersData: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            playersData: data.map(item => ({ ...item, completed: 0}))
        };
    }

    componentWillMount() {
        clearTimeout(this.timer);
    }

    componentDidMount(){
        this.timer = setTimeout(() => this.progress(5), 100);
    }

    progress(completion) {
        let done = 0;
        this.setState({
            playersData: data.map((item, i) => {
                // eslint-disable-next-line react/destructuring-assignment
                const { completed: current } = this.state.playersData[i];
                const { completed: max } = item;
                if (current + completion >= max) {
                    done += 1;
                }
                return {
                    ...item,
                    completed: Math.min(current + completion, max),
                };
            }),
        });
        if (done < data.length) {
            this.timer = setTimeout(() => this.progress(5), 100);
        }
    }

    render(){
        const { shipments } = this.props;
        return(
            <Container>
                {shipments!==null&&
                // eslint-disable-next-line react/prop-types
                shipments.map((row) => 
                    <ShipmentItem key={row.id}>
                        <ShipmentItemRow>
                            <IDLabel>{row.id}</IDLabel>
                            <VendLabel>{row.venderID}</VendLabel>
                        </ShipmentItemRow>
                        <ShipmentItemRow>
                            <ItemLocation>
                                {row.location}
                            </ItemLocation>
                            <ShipmentTypeItem>
                                {row.route}
                            </ShipmentTypeItem>
                        </ShipmentItemRow>
                        <ShipmentProgressRow>
                            <ThemeProvider theme={theme}>
                                {
                                    row.state===1&&<LinearProgress style={{width: "100%", borderRadius: "2px" }}variant="determinate" value={row.progress} color="secondary"/>
                                }
                                {
                                    row.state!==1&&<LinearProgress style={{width: "100%", borderRadius: "2px" }}variant="determinate" value={row.progress} color="primary"/>
                                }
                                {row.progress}
                            </ThemeProvider>                            
                            {/* <CustomProgressBar max="100" value={row.progress}></CustomProgressBar> */}
                        </ShipmentProgressRow>
                        <CommitLabel>
                            {row.commit}
                        </CommitLabel>
                    </ShipmentItem>
                )}
            </Container>
        );
    }    
};

ShipmentDashboardItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    shipments: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
    return {
        shipments: props.shipments,
    };
};

export default connect(mapStateToProps)(ShipmentDashboardItem);