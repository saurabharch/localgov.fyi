import React, { Component } from "react";

import _ from "lodash";

import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
    support_footer: {
        margin: `${theme.spacing(3)}px 0`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    },
    support_footer_header: {
        marginBottom: theme.spacing(1),
    },
   support_footer_links: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'left'
    },
    svgIcon: {
        fontSize: '20px'
    },
    support_container: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});


class FooterSupport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false,
        }
    }

    componentDidMount() {
        this.setState({ isMob: isMobileOnly });
    }

    render() {
        const { classes, } = this.props;

        return (
            <div className={classes.support_footer}>
                <div className={classes.support_footer_header}>
                    <Typography variant="h4" style={{ fontSize: "0.85rem" }} >
                        Support
                    </Typography>
                </div>
                <div className={classes.support_footer_links}>
                    <Typography variant="caption" >
                    <a
                        href={`https://evergov.zendesk.com/hc/en-us`}
                        className={classes.footer_social_icon}

                        target="_blank">
                        Help
                        </a>
                        </Typography>
                    <Typography variant="caption">
                    <a
                        href={`/terms`}
                        className={classes.footer_social_icon}

                        target="_blank">
                        Terms
                        </a>
                    </Typography>
                    <Typography variant="caption">
                    <a
                        href={`/privacy`}
                        className={classes.footer_social_icon}

                        target="_blank">
                        Privacy
                        </a>
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(FooterSupport);