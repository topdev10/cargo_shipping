import React from 'react';
import styled from 'styled-components';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import ExpandOpen from '../../images/expend-open.png';
import ExpandClose from '../../images/expend-close.png';
import CheckboxChecked from '../../images/checkbox-checked.png';
import CheckboxUnchcked from '../../images/checkbox-unchecked.png';
import CheckboxHalfChecked from '../../images/checkbox-half-checked.png';

const TreeContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    padding: 32px 12px 12px 12px;
`;

const TreeHeader = styled.div`
    display: flex;
    align-items: center;
    background: #ccc;
    color: black;
    font-size: 18px;
    height: 42px;
    padding: 5px 10px;
`;

const TreeWrapper = styled.div`
    display: flex;
    height: 100%;
    border: 2px solid #ccc;
    overflow: auto;
`;

const CancelButton = styled.div`
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;
    padding: 8px 12px;
    flex: flex-end;
    cursor: pointer;
    text-align: right;
    margin: 8px 0px 0px 0px;

    &:hover {
        background: red;
    }
`;

class TreeMultiSelector extends React.Component {
    state = {
        checked: [],
        expanded: ['all', 'container', 'shipment'],
    };

    constructor(props) {
        super(props);

        this.onCheck = this.onCheck.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onExpand = this.onExpand.bind(this);
    }

    onCheck(checked) {
        // eslint-disable-next-line react/prop-types
        const { handleChecked } = this.props;
        this.setState({ checked });
        handleChecked(checked);
    }

    onClick(clicked) {
        const { checked } = this.state;
        // eslint-disable-next-line react/prop-types
        const { handleChecked } = this.props;
        let flag = false;
        let pos = 0;
        checked.forEach((element, ind) => {
            if(element === clicked.value)
            {
                flag = true;
                pos = ind;
            }
        });
        if(!flag)
            checked.push(clicked.value);
        else checked.splice(pos, 1);
        handleChecked(checked);
    }

    onExpand(expanded) {
        this.setState({ expanded });
    }

    render() {

        const { checked, expanded } = this.state;
        // eslint-disable-next-line react/prop-types
        const { reportNodes, handleCancel } = this.props;

        return (
            <TreeContainer>
                <TreeHeader>
                    Choose columns for your report
                </TreeHeader>
                <TreeWrapper>
                    <CheckboxTree
                        checked={checked}
                        expanded={expanded}
                        nodes={reportNodes}
                        expandOnClick
                        onCheck={this.onCheck}
                        onClick={this.onClick}
                        onExpand={this.onExpand}
                        icons={{
                            check: <img src={CheckboxChecked} alt="Chcked" />,
                            uncheck:  <img src={CheckboxUnchcked} alt="UnChcked" />,
                            halfCheck: <img src={CheckboxHalfChecked} alt="HalfChcked" />,
                            expandClose: <img src={ExpandClose} alt="Expand" />,
                            expandOpen: <img src={ExpandOpen} alt="Expand" />,
                            expandAll: <img src={ExpandOpen} alt="Expand" />,
                            collapseAll: <img src={ExpandOpen} alt="Expand" />,
                            parentClose: "",
                            parentOpen: "",
                            leaf: "",
                        }}
                        style={{border: "2px solid #ccc"}}
                    />
                </TreeWrapper>
                <CancelButton onClick={handleCancel} >
                    Cancel
                </CancelButton>
            </TreeContainer>
        );
    }
}

export default TreeMultiSelector;