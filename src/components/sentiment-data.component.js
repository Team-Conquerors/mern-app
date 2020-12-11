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

export default class SentimentOutput extends Component {
  constructor(props) {
    super(props);

    this.state = {items: []};
  }

  componentDidMount() {
      // url which is node output the data
    axios.get('http://localhost:5000/sentiment')
      .then(response => {
        this.setState({ items: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  sentimentDataList() {
    return this.state.items.map(currentItems => {
      return <Items item={currentItems} key={currentItems._id}/>;
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
      </div>
    )
  }
}
