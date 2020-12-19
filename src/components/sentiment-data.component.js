import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

// import InsertItem from "./insert-item.component";

const Items = props => (


    <tr>
        <td>{props.item._id}</td>
        <td>{props.item.item}</td>
        <td>{props.item.positive}</td>
        <td>{props.item.negative}</td>

    </tr>

)

// class name : this.props
export default class SentimentOutput extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.itemname)

        this.state = {
            name: '',
            items: [],
            selectedItem: []
        };
    }

    onSubmit = name => {
        this.setState({ name })
        // console.log('App comp got ' , name)
    }




    componentDidMount(props) {
        const selectedItemName = this.props.name
        console.log('in sentiment data', this.props.name)
        // url which is node output the data
        axios.get('http://localhost:5000/sentiment')

            .then(response => {
                // filtering
                const outputArrayObject = response.data
                const filteredArray = outputArrayObject.find(nameOfItem => nameOfItem.item === selectedItemName)
                console.log(filteredArray)

                this.setState({
                    items: response.data,
                    selectedItem: filteredArray
                })
            })
            // .then(function (response){
            //     return response.json()
            //     })
            // .then(function(myJson) {
            //     console.log(myJson)
            // })

            .catch((error) => {
                console.log(error);
            })
    }

    sentimentDataList() {
        return this.state.items.map(currentItems => {
            return <Items item={currentItems} key={currentItems._id} />;
        })
    }

    render(props) {
        return (
            <div>
                <br/>
                <h3>Analyzed Feedback Report</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Positive</th>
                        <th>Negative</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.sentimentDataList() }
                    </tbody>
                </table>
                <br/>
                <h4>Item name: {this.props.name}</h4>
                <br/>
                {/*<InsertItem onSubmit={name => this.onSubmit(name)}/>*/}
                <p>Selected Item data:</p>
                <p>{JSON.stringify(this.state.selectedItem, null, 2)}</p>
            </div>
        )
    }
}
