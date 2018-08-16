import React from 'react'

import StockShowTile from '../../components/stocks/StockShowTile'

class StockShowContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stock: null,
      userInfo: null,
      stats: null,
      lineData: [],
      reviews: []
    }
    this.addReview = this.addReview.bind(this)
    this.deleteReview = this.deleteReview.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/stocks/${this.props.params.id}.json`, { credentials: 'same-origin' })
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
        this.setState({
          stock: body.stock,
          userInfo: body.userInfo,
          stats: body.stats,
          lineData: body.lineChart,
          reviews: body.reviews
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  addReview = (payload) => {
    fetch(`/api/v1/reviews.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(response => {
        if(response.ok){
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage)
              if(response.status == 401){
                alert("You must be signed in to leave reviews!!!")
              }
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => {
        if(body.review){
          this.setState({ reviews: this.state.reviews.concat(body.review) })
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteReview = (reviewId) => {
    fetch(`/api/v1/reviews/${reviewId}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      method: 'DELETE',
    })
      .then(response => {
        if(response.ok){
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => {
        let newReviewArray = this.state.reviews.filter( review => {
          return review.id != reviewId
        })
        this.setState({ reviews: newReviewArray })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let stock = ''
    if (this.state.stock){
      stock = <StockShowTile
                id={this.state.userInfo.id}
                stock={this.state.stock}
                userInfo={this.state.userInfo}
                stats={this.state.stats}
                data={this.state.lineData}
                reviews={this.state.reviews}
                addReview={this.addReview}
                deleteReview={this.deleteReview}
              />
    }
    else{
      stock = 'Please log in to view your list of investments'
    }

    return(
      <div className="row">
        <div className='columns small-10 small-centered'>
          {stock}
        </div>
      </div>
    )
  }
}

export default StockShowContainer
