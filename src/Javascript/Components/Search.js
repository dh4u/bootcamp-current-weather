// using Google Maps autosuggest tutorial from https://medium.com/@hamza.qaisrani.hq/using-the-google-maps-places-autocomplete-javascript-api-in-a-react-project-5742bab4abc9
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Script from 'react-load-script';
import SearchBar from 'material-ui-search-bar';

class Search extends Component {
    render() {
        let handleScriptLoad = this.props.handleScriptLoad;
        let query = this.props.query;
        //console.log("Search.js");
        console.log("process.env.REACT_APP_GOOGLE_MAPS_API_KEY: " + process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
        return(
            <div>
                <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}          
                onLoad={handleScriptLoad}        
                />
                <MuiThemeProvider>
                    <SearchBar id="autocomplete" ref={this.props.useRef} value={query}
                    hintText="Search for a city" placeholder=""
                    onChange={() => console.log('onChange')}
                    onRequestSearch={() => console.log('onRequestSearch')}
                    style={{
                        margin: '0 auto'
                        ,minWidth: 500
                        ,float: 'left'
                    }} />
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Search;