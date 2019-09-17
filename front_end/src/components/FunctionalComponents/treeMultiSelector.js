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
    overflow: auto;
`;

const CancelButton = styled.div`
    border-radius: 4px;
    border: 2px solid #AFF;
    cursor: pointer;
`;

class TreeMultiSelector extends React.Component {
    state = {
        checked: [],
        expanded: ['all', 'container', 'shipment'],
        clicked: {},
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
        this.setState({ clicked });
    }

    onExpand(expanded) {
        this.setState({ expanded });
    }

    render() {

        const { checked, expanded, clicked } = this.state;
        const notClickedText = '(none)';
        // eslint-disable-next-line react/prop-types
        const { reportNodes, handleCancel } = this.props;

        return (
            <TreeContainer>
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
                />
                <CancelButton onClick={handleCancel} >
                    <strong>Clicked Node</strong>: {clicked.value || notClickedText}
                </CancelButton>
            </TreeContainer>
        );
    }
}

export default TreeMultiSelector;