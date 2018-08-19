import React from 'react'

class ReviewFormContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      body: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event){
    event.preventDefault()

    let newReview = {
      body: this.state.body,
      stock_id: this.props.stockId
    }
    this.props.handleAdd(newReview)
    this.handleClear()
  }

  handleClear(){
    this.setState({
      body: '',
      errors: {}
    })
  }

  render(){
    let errorDiv
    let errorItems
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="panel callout alert">{errorItems}</div>
    }

    return(
      <form className="panel callout" onSubmit={this.handleSubmit}>
        <h1 className="form-header">New Review</h1>
        {errorDiv}
        <label htmlFor='body'>Comments:</label>
        <div className='review-textarea'>
          <textarea type="text" name='body' value={this.state.body} onChange={this.handleChange}/>
        </div>
        <button type="submit" className="button" value="Submit">Add Review</button>
      </form>
    )
  }
}

export default ReviewFormContainer
