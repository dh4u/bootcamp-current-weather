import React from 'react';
import Header from './Header.js';
import Display from './Display.js';
import Search from './Search.js';
import Select from './Select.js';

class Weather extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            city: ""
            ,query: ""
            ,cities: []
        };

        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        this.handlePlaceTextInput = this.handlePlaceTextInput.bind(this);
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.searchRef = React.createRef();
        this.selectRef = React.createRef();
        //this.NODE_ENV = this.NODE_ENV.bind(this);
    }

    handlePlaceSelect(event){
        //console.log("handlePlaceSelect");
        //console.log(event.target.innerHTML);
        //console.log(event);
        
        // set state
        this.setState({
            city: event.target.innerHTML
            ,query: event.target.innerHTML
            ,
        });
    }
    
    handlePlaceTextInput(){
        // extract city from address object
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;
        let newCityList = this.state.cities;
        newCityList.push(addressObject.formatted_address);

        // Check if address is valid
        if(address){
            // set state
            this.setState({
                city: address[0].long_name
                ,query: addressObject.formatted_address
                ,cities: newCityList
                ,
            });

            //
        }
    }

    handleScriptLoad(){
        //options for autocomplete
        var options = {
            types: [ "(cities)" ],
        }

        // initialize Google autocomplete
        // To disable any ESLINT "Google not defined" errors.
        /*global google*/
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete')
            ,options
            ,
        )
        
        // fire event when a suggested name is selected
        this.autocomplete.addListener('place_changed', this.handlePlaceTextInput);
    }
    
    render(){
        console.log("Weather.js");
        return(
            <>
                <Header />
                <Search query={this.state.query} useRef={this.searchRef} handleScriptLoad={this.handleScriptLoad} />
                <br />
                <br />
                <br />
                <Select cities={this.state.cities} useRef={this.selectRef} onClick={e => this.handlePlaceSelect(e)} selected={this.state.city} />
                <br />
                <br />
                {/* Display was not re-rendering until I put the "key={this.state.query}" in  */}
                <Display key={this.state.query} city={this.state.query} useRef={this.searchRef} />
            </>
        )
    }
}
export default Weather;