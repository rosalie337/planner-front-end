import React from 'react';
import AddItem from './AddItem.js';
import PlannerAppLogin from './TodoAppLogin';
import './App.css';
import { 
    BrowserRouter, 
    Route, 
    Redirect,
    Switch,
 } from 'react-router-dom';


const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends React.Component {
    render() {
        return (
        <div className="App">
            <header>
                my header
            </header>
            <BrowserRouter>
                <Route path='/' render={() => 
                isLoggedIn() 
                    ? <AddItem />
                    : <Redirect to='login' />
                }/>
                 <Route path='/login' component={PlannerAppLogin} />
            </BrowserRouter>
        </div>
    );
    }
}