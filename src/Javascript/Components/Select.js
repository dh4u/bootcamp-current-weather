import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Select extends React.Component{
    constructor(props){
        super(props);
        
        this.onClick = this.props.onClick.bind(this);
        //console.log(this.onClick);
    }
    
    render(){
        //added the conditional because performing map on this.props.cities after it becomes empty throws an error
        let cities = this.props.cities;//.length ? this.props.cities : [];
        cities = cities.sort(); // order the cities alphabetically
        
        if(cities.length >= 1){
            //console.log("Select.js");
            console.log("selected: " + this.props.selected);
            const selected = this.props.selected;
            return(
                <>
                <DropdownButton id="dropdown-item-button" ref={this.props.useRef} title="Choose a Recent City">
                    {
                        cities.map(
                            (city, index) =>(
                                <Dropdown.Item as="button" active={selected === city} selected={selected === city} key={city} onClick={(e) => this.onClick(e)}>{city}</Dropdown.Item>
                            )
                        )
                    }
                </DropdownButton>
                </>
            )
        }else{
            return(
                <>
                
                </>
            )
        }
    }
}
export default Select;