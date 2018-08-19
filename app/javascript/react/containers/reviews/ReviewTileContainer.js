import React from 'react'
import { browserHistory } from 'react-router'

class ReviewTileContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userId: null,
      reviewId: null,
      adminStatus: false
    }
    this.formatDate = this.formatDate.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/stocks/${this.props.stockId}/reviews/${this.props.id}.json`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ adminStatus: body.adminStatus })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  formatDate(date){
    const MONTHS = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return MONTHS[monthIndex] + ' ' + day + ' ' + year;
  }

  render(){
    let reviewBody = this.props.review.body
    let createdDate = this.props.review.created_at.substring(0, 10)
    let formattedDate = this.formatDate(new Date(createdDate))
    let username = this.props.review.user.username
    let deleteButton = ''
    if (this.state.adminStatus){
      deleteButton = <button onClick={this.props.handleDelete}>Delete</button>
    }
    return(
      <div className="review-box panel callout radius">
        <div className='row'>
          <div className='review-username columns small-6'>{username}</div>
          <div className='review-date columns small-6'>{formattedDate}</div>
        </div>
        <div className='review-body row'>
          {reviewBody}
        </div>
        <div className='review-button row'>
          {deleteButton}
        </div>
      </div>
    )
  }
}

export default ReviewTileContainer
