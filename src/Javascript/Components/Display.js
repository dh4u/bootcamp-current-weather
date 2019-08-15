import React from 'react';

export class Display extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null
            ,isLoaded: false
            ,weather: null
            ,city: this.props.city
            ,
        };
        this.useRef = this.props.useRef;
    }
    componentDidMount() {
        
        //console.log("this.props.city: " + this.props.city);
        if( this.props.city ){
            //console.log("process.env.REACT_APP_OPEN_WEATHER_API_KEY: " + process.env.REACT_APP_OPEN_WEATHER_API_KEY);
            //console.log("Display.js has this.props.city");
            fetch("https://api.openweathermap.org/data/2.5/weather?appid=" + process.env.REACT_APP_OPEN_WEATHER_API_KEY + "&units=imperial&q=" + this.props.city)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                        city: this.props.city
                        ,isLoaded: true
                        ,weather: result }); 
                    },
                    // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
                    (error) => {
                        //console.log("fetch error");
                        //console.log(error);
                        this.setState({
                        isLoaded: true,
                        error: error
                        });
                    }
                ).then(() => {
                    // API returns cod when the city isn't found
                    //console.log(this.state.weather.cod);
                    if( this.state.weather.cod === "404" ){
                        //console.log("fetch error 404");
                        this.setState({
                        isLoaded: true,
                        error: this.state.weather.message
                        });
                    }
                })
        }
    }

    render() {
        console.log("Display.js");
        const { error, isLoaded, weather } = this.state;
        //console.log("process.env.REACT_APP_OPEN_WEATHER_API_KEY: " + process.env.REACT_APP_OPEN_WEATHER_API_KEY);
        
        if ( error ) { 
            return <div>Error: {error}</div>;
        } else if ( !isLoaded ) { 
            return <div>Please enter / choose a city above</div>;
        } else { 
            document.getElementById("dropdown-item-button").value = "";
            /* return(<></>); */
            if( this.state.weather.cod === 200 ){
                return (
                    <>
                        The current weather in <strong>{this.props.city}</strong> is <strong>{weather.main.temp}</strong> degrees Farenheit.
                    </>
                )
            }else{
                return (
                    <>
                        We could not find the temperature for <strong>{this.props.city}</strong>.
                    </>
                )
            }
            ;
        }
    }
}
export default Display;