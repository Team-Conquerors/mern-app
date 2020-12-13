import '../App.css';
import React from 'react';
import Navbar from "./navbar.component";
import axios from "axios";

class InsertItem extends React.Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            itemName: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            itemName: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const item = {
            itemName: this.state.itemName
        }

        // console.log(item);

        axios.post('http://localhost:5000/sentiment', item)
            .then(res => console.log(res.data));

        this.setState({
            itemName: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Search new Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Item name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.itemName}
                                onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default InsertItem;

