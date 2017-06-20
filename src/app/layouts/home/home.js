import React from "react";
import CSSModules from 'react-css-modules';
import style from "./home.scss"

class HomeComponent extends React.Component {

    render() {
        return (
            <div styleName="wrap">

                <div styleName="content">
                    <h1>Build React Applications Quicker</h1>
                </div>

            </div>
        )
    }
}




export default CSSModules(HomeComponent, style, {allowMultiple: true});