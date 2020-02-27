import React, { Component } from 'react'

export default class AddItem extends Component {
    render() {
        return (
            <div>
                <input value={ this.props.todoInput } onChange={ this.props.handleInput} />
                <button onClick={this.props.handleClick}>Add</button>
            </div>
        )
    }
}