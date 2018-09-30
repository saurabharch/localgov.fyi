import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import AccountBalance from '@material-ui/icons/AccountBalance';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Rowing from '@material-ui/icons/Rowing';
import Assignment from '@material-ui/icons/Assignment';
import Report from '@material-ui/icons/Report';
import Home from '@material-ui/icons/Home';
import Folder from '@material-ui/icons/Folder';

import ShoppingCart from '@material-ui/icons/ShoppingCart';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Autorenew from '@material-ui/icons/Autorenew';

import withRoot from '../withRoot';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
  card: {
    height: 148,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    color: theme.palette.primary['500'],
    fontSize: 64,
  },
});

const ServiceGrid = ({ classes, city, services }) => {
  const icons = {
    Apply: <Assignment className={classes.icon} />,
    Pay: <AttachMoney className={classes.icon} />,
    Recreational: <Rowing className={classes.icon} />,
    Register: <Autorenew className={classes.icon} />,
    Report: <Report className={classes.icon} />,
    Voter : <Autorenew className={classes.icon}/>,
    Food: <ShoppingCart className={classes.icon} />,
    Vehicle: <DirectionsCar className={classes.icon} />,
    Renew: <Autorenew className={classes.icon} />,
  };

  let trimmedServices = services;
  if (city && services.length > 7) trimmedServices = services.slice(0, 7);
  else if (city && services.length > 3) trimmedServices = services.slice(0, 3);
  console.log(trimmedServices);
  return (
    <Grid container spacing={16}>
      {trimmedServices.map((service, index) => {
        return (
          <Fragment>
            {!isMobileOnly && (index === 0 || index === 4) && <Grid item md={2} />}
            <Grid item xs={6} md={2}>
              <Link to={`/service/${service.id}/`} className={classes.link}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    {service.service_name.split(' ').map(word => {
                      return icons[word];
                    })[0] || <AccountBalance className={classes.icon} />}
                    <Typography variant="caption" color="textPrimary" noWrap>
                      {service.service_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            {(city && index === trimmedServices.length - 1) &&
              <Fragment>
                <Grid item xs={6} md={2}>
                  <Link to={`/organization/${city.id}/`} className={classes.link}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <MoreHoriz className={classes.icon} />
                        <Typography variant="caption" color="textPrimary" noWrap>
                          More Services
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
                <Grid item md={2} />
              </Fragment>
            }
            {!isMobileOnly && (index === 3) && <Grid item md={2} />}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default withRoot(withStyles(styles)(ServiceGrid));
