import React, { Fragment } from 'react';
import {connect} from "react-redux";
import Spinner from 'react-spinkit';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Typography from '@material-ui/core/Typography';
import ContentLoader from "react-content-loader"
import CircularProgress from '@material-ui/core/CircularProgress';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import { fetchGoogLoc, updateSearchText} from './actions';

import { trackClick, trackInput} from "../common/tracking";

const styles = theme => ({
    ser_template_card: {
        cursor: 'pointer',
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        boxShadow: `0 2px 5px 2px ${theme.palette.primary['100']}`
    },
    ser_template_card_img: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '80px',
        padding: theme.spacing.unit * 3
    },
    ser_template_card_content: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    ser_gloss_search_paper_root: {
        padding: '6px',
 
        display: 'flex',
        alignItems: 'center',
        boxShadow: `0 1px 6px 0 #dfdfdf`,
        border: `1px solid ${theme.palette.primary['100']}`,
        borderRadius: '8px',
        '&:hover': {
            boxShadow: `0 4px 8px 0 #dfdfdf, 0 1px 16px 0 #fafafa inset`,
            border: `1px solid ${theme.palette.primary['200']}`
        },
    },
    ser_gloss_search_input: {
        flex: 1,
        fontSize: "16px",
        fontWeight: 500,
        fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
        lineHeight: "1.46429em",
        width: '100%',
        color: "rgba(30, 30, 50,0.99)",
    },
    ser_gloss_placesContainer:{
        display: 'flex',
        width: '100%',
        minWidth: '320px',
        justifyContent: 'center',
        position: 'relative',
        margin: theme.spacing.unit *2
    },
    ser_gloss_search_suggestions:{
        position: 'absolute',
        zIndex: '200',
        borderRadius: '8px',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        boxShadow: `0 8px 16px 0 #d4d4d4`,
    },
    ser_gloss_search_iconButton: {
        minHeight: '1em',
        padding: theme.spacing.unit,
    }
});


const SuggestionContentLoader = props => (
    <ContentLoader
        height={150}
        width={400}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <circle cx="10" cy="20" r="8" />
        <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
        <circle cx="10" cy="50" r="8" />
        <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
        <circle cx="10" cy="80" r="8" />
        <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
        <circle cx="10" cy="110" r="8" />
        <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
        <rect x="1" y="10" rx="0" ry="0" width="394" height="17" />
        <rect x="1" y="42" rx="0" ry="0" width="394" height="17" />
        <rect x="-1" y="74" rx="0" ry="0" width="394" height="17" />
        <rect x="-2" y="104" rx="0" ry="0" width="394" height="17" />
        <rect x="-1" y="136" rx="0" ry="0" width="394" height="17" />
    </ContentLoader>
)


class GoogAutoComplete extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = address => {

        this.props.setSearchText(address)
    };

    handleSelect = address => {
        const { serviceTemplateId, fetchGoogLoc} = this.props;
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => fetchGoogLoc(serviceTemplateId, ...latLng))
            .catch(error => console.error('Error', error));
        this.props.setSearchText(address)
        this.searchInput.blur();
    };


    render() {
        const {classes, searchText} = this.props;
        return (
            <Grid container>
            <Grid item xs="auto" md={4}></Grid>

            <Grid item xs={12} md={4} className={classes.ser_gloss_placesContainer}>
            <PlacesAutocomplete
                value={searchText}
                onChange={this.handleChange}
                ref="placesAutocomplete"
                onSelect={this.handleSelect}
                debounce={50}
                highlightFirstSuggestion
                shouldFetchSuggestions={(searchText && searchText.length > 1)}
                        googleCallbackName="initTemplate"
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div style={{ width: '100%' }}>
                        <Paper className={classes.ser_gloss_search_paper_root} elevation={2}>
                            <IconButton className={classes.ser_gloss_search_iconButton} aria-label="Search">
                                        {loading ? (<CircularProgress size={24}  />) : (<SearchIcon color="primary" />)}
                            </IconButton>
                                    <InputBase {...getInputProps({
                                placeholder: 'Search locations',
                                autoFocus: false,
                                type: 'search',
                                inputRef: node => {
                                    this.searchInput = node;
                                },
                                className:  classes.ser_gloss_search_input,
                            })} />
                        </Paper>
                
                        <Paper className={classes.ser_gloss_search_suggestions} elevation={2}>
                            {loading ? (<div style={{padding: '8px', width: '100%' }}>
                                       <SuggestionContentLoader/>
                                    </div>) : null}
                            {!loading ? (suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#d4d4d4', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div style={{padding: '8px', width: '100%' }}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <Typography variant='caption' style={{ color: "rgba(30, 30, 50,0.99)" ,  borderBottom: '1px solid #d4d4d4', padding: '8px'}} >
                                           {suggestion.description}</Typography>
                                    </div>
                                );
                            }) ) : null }
                        </Paper>
                    </div>
                )}
            </PlacesAutocomplete>
            </Grid>
                <Grid item xs="auto" md={4}></Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        },
        fetchGoogLoc: (serviceTemplateId, lat, lng) => {
            dispatch(fetchGoogLoc(serviceTemplateId, lat, lng));
        },
        setSearchText: (addr) => {
            dispatch(updateSearchText(addr));
        },
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.serTemplate,
        ...ownProps
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GoogAutoComplete));