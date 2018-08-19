import React from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import '!style-loader!css-loader!rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)
const wrapperStyle = { width: '50%'  }

class EditStockFormContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      stock: this.props.stock,
      range: [this.props.stock.low, this.props.stock.high],
      share: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleEdit = (event) => {
    event.preventDefault()
    let formatPayload = {
      stock: this.state.stock,
      range: this.state.range
    }
    this.props.handleEdit(formatPayload)
  }

  handleDelete = (event) => {
    event.preventDefault()
    let formatPayload = {
      symbol:this.state.stock.symbol
    }
    this.props.handleDelete(formatPayload)
  }

  render(){

    let stock = this.state.stock
    let range = this.state.range

    return(
      <form className='edit-stock-form' onSubmit={this.handleEdit}>
          <div>Set your acceptable investment range:</div>
          <div style={wrapperStyle} className='edit-slider'>
            <Range min={Math.floor(stock.low - 10)}
                  max={Math.floor(stock.high + 10)}
                  defaultValue={[Math.floor(stock.low - 1), Math.floor(stock.high + 1)]}
                  allowCross={false}
                  onChange={value => this.setState({ range: [value[0], value[1]] })}
                  tipFormatter={value => `$${value}`}
                  name='range'
                  className='edit-rc-slider'
            />
          </div>
          <div className='edit-button-set'>
            <button type='submit' className='edit-button radius'>Edit Range</button>
            <button className='delete-button radius' onClick={this.handleDelete}>Sell Shares</button>
          </div>
      </form>
    )
  }
}

export default EditStockFormContainer
