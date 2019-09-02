import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Assignment from '@material-ui/icons/Assignment';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Assessment from '@material-ui/icons/Assessment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Dashboard from '@material-ui/icons/Dashboard';

import { history } from '../helpers';

const Container = styled.div`
    // position: fixed;
    z-index: 1200;
    display: flex;
    flex-direction: column;
    width: 180px;
    overflow-x: hidden;
    height: calc(100vh - 64px);
    margin-top: 64px;
    justify-content: center;
    transition: width 2s;
    background: #eff7ff;
    padding: 10px;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
`;

const useTreeItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.secondary,
        '&:focus > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    const redirectPage = (e) => {
        e.preventDefault();
        history.push(`/pages/${labelText}`);
    };

    return (
        <TreeItem
            onClick={e=> redirectPage(e)}
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

StyledTreeItem.defaultProps = {
    bgColor: "#e8f0fe",
    color: "#1a73e8",
    labelInfo: "",
};

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default function GmailTreeView() {
    const classes = useStyles();

    return (
        <Container>
            <TreeView
                className={classes.root}
                defaultExpanded={['3']}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
            >
                <StyledTreeItem nodeId="1" labelText="Dashboard" labelIcon={Dashboard} />
                <StyledTreeItem nodeId="2" labelText="Quotes" labelIcon={Assignment} />
                <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={DirectionsBoat}>
                    <StyledTreeItem
                        nodeId="6"
                        labelText="Social"
                        labelIcon={SupervisorAccountIcon}
                        labelInfo=""
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                    />
                    <StyledTreeItem
                        nodeId="7"
                        labelText="Updates"
                        labelIcon={InfoIcon}
                        labelInfo=""
                        color="#e3742f"
                        bgColor="#fcefe3"
                    />
                    <StyledTreeItem
                        nodeId="8"
                        labelText="Forums"
                        labelIcon={ForumIcon}
                        labelInfo=""
                        color="#a250f5"
                        bgColor="#f3e8fd"
                    />
                    <StyledTreeItem
                        nodeId="9"
                        labelText="Promotions"
                        labelIcon={LocalOfferIcon}
                        labelInfo=""
                        color="#3c8039"
                        bgColor="#e6f4ea"
                    />
                </StyledTreeItem>
                <StyledTreeItem nodeId="4" labelText="Billing" labelIcon={AccountBalance} />
                <StyledTreeItem nodeId="5" labelText="Reports" labelIcon={Assessment} />
            </TreeView>
        </Container>
    );
}
