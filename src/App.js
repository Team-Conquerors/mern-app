import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import SentimentOutput from "./components/sentiment-data.component";
import InsertItem from "./components/insert-item.component"

function App() {
    return (
        <Router >
            <div className = "container" >
                <Navbar/>
                    <br/> <br/>
                <Route path="/" exact component={InsertItem} />
                <Route path="/dashboard" component={SentimentOutput} />
            </div>
        </Router >
    );
}

export default App;
