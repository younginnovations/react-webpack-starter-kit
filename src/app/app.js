import React from "react";
import styles from "./app.css";



class AppComponent extends React.Component {

    render() {
        return (
            <div className={styles.heading}>
                <img src={require("../assets/logo.png")} alt=""/>
                <div>
                    Hello world
                </div>
            </div>

        )
    }
}



export default AppComponent;