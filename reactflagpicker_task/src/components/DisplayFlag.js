import React, {Component} from 'react';
import '../style/sass/3-modules/_displayFlag.sass'

class DisplayFlag extends Component {

    render() {
        return (
            <div className="column">
                <div>
                    {this.props.flagName}
                </div>
                <div>
                    {this.props.countryName}
                </div>
            </div>
        )
    }
}



export default DisplayFlag;