import React from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 28,
    left: 24,
    zIndex: 10,
    width: 300,
    padding: theme.spacing.unit * 2,
  },
  rootMobile: {
    position: 'absolute',
    top: 28,
    left: -200,
    zIndex: 10,
    width: 300,
    padding: theme.spacing.unit * 2,
  },
  heading: {
    marginBottom: theme.spacing.unit,
  },
  link: {
    color: theme.palette.primary['500'],
    textDecoration: 'none',
  },
});

const UnclaimedHover = ({ classes }) => {
  return (
    <Paper className={isMobileOnly ? classes.rootMobile : classes.root}>
      <Typography variant="body1" color="default" className={[classes.heading, classes.bold]}>
        This government agency has not claimed their profile.
      </Typography>
      <Typography variant="caption" color="default">
        <Link to="/claim/" className={classes.link}>Claim this page</Link> <span className={classes.bold}>for free</span> to manage services, post updates, respond to queries, and engage with your local community.
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(UnclaimedHover);
