import React, { Component } from 'react'
import AddItem from './AddItem.js';
import request from 'superagent';

export default class PlannerApp extends Component {
    state = { planner: [] }
    componentDidMount = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const planner = await request.get(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/planner`)
            .set('Authorization', user.token);

        console.log(planner.body)
        this.setState({ planner: planner.body })
    }

    handleClick = async () => {
        const newItem = {
            // math.random() is fine here because this is a fake todo
            id: Math.random(),
            task: this.state.plannerInput,
            complete: false,
        };

        const user = JSON.parse(localStorage.getItem('user'));


        const newItem = [...this.state.planner, newItem];

        this.setState({ planner: newItem });
        const data = await request.post(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/planner`, {
            task: this.state.plannerInput
        })
            .set('Authorization', user.token);
    }

    handleInput = (e) => { this.setState({ plannerInput: e.target.value })};
    
    render() {
        if (localStorage.getItem('user')) {
        return (
            <div>
                <h3>Hello {JSON.parse(localStorage.getItem('user')).email}</h3>
                <AddItem 
                plannerInput={ this.state.plannerInput } 
                handleClick={ this.handleClick } 
                handleInput={ this.handleInput } 
            />
                {
                    this.state.planner.map((todo) => <p 
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none'
                        }}
                        onClick={async () => {
                            // lets mutate! make a copy of the array in state
                        const newItem = this.state.planner.slice();
                            // go find whichever todo we're talking about here
                        const matchingTodo = newItem.find((thisTodo) => todo.id === thisTodo.id);

                        matchingTodo.complete = !todo.complete
                        const user = JSON.parse(localStorage.getItem('user'));
                        
                        this.setState({ planner: newItem });
                        const data = await request.put(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/planner/${todo.id}`, matchingTodo)
                        .set('Authorization', user.token);
                    }} key={todo.id}>
                        {todo.task}
                    </p>)
                }
            </div>
        )
            }
    }
}