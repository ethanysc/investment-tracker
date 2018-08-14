import React from 'react'

import StockShowTile from '../../components/stocks/StockShowTile'

class StockShowContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stock: null,
      userInfo: null,
      stats: null
    }
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
          stats: body.stats
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let stock = ''
    if (this.state.stock){
      stock = <StockShowTile
                id={this.state.stock.id}
                stock={this.state.stock}
                userInfo={this.state.userInfo}
                stats={this.state.stats}
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
