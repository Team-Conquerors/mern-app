import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
        console.log(this.props.itemname)

        this.state = {items: []};
    }

    componentDidMount(props) {
        console.log(props)

        // url which is node output the data
        axios.get('http://localhost:5000/sentiment')

            .then(response => {
                // filtering
                const outputArrayObject = response.data
                const filteredArray = outputArrayObject.find(nameOfItem => nameOfItem.item == 'tv')
                console.log(filteredArray)

                this.setState({
                    items: response.data
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

    render() {
        return (
            <div>
                <h3>Analysed Feedback Report</h3>
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
                <h1>Item name: {this.props.itemname}</h1>
            </div>
        )
    }
}
