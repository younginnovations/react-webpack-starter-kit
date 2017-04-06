import React from "react";
import TestComponent from "./test";
import styles from "./test.scss";



class AppComponent extends React.Component {

    render() {
        return (
            <section>
                <img src={require("../assets/logo.png")} alt=""/>
                
                    <div className={styles.heading}>
                        Hello World 
                    </div>
                
                    <TestComponent />
            </section>

        )
    }
}



export default AppComponent;