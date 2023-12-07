import React from 'react';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Leaderboard } from './leaderboard/leaderboard';
import { Profile } from './profile/profile';
import { Lift } from './lift/lift';

function App() { 
    const [user, setUser] = React.useState(null);

    console.log(user);

    return (
        <BrowserRouter>
            <div className='body bg-dark bg-image bg-cover' data-bs-theme="dark">
                <header>
                    <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-5'>
                        <a className="navbar-brand" href="#">
                            <h1 style={{ fontWeight: 'bold', fontSize: '46px', paddingLeft: '3%', paddingTop: '3%', paddingBottom: '3%' }}>
                                Optimal Lifts
                            </h1>
                        </a>
                        <button className="navbar-toggler m-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                
                                {/* if user is null this is the only link */}
                                {user === null && (
                                    <li className="nav-item" style={{ paddingLeft: '6%' }}>
                                        <NavLink className='nav-link' to=''>
                                            Login
                                        </NavLink>
                                    </li>
                                )}
                                <li className="nav-item" style={{ paddingLeft: '6%' }}>
                                    <NavLink className='nav-link' to='leaderboard'>
                                        Leaderboard
                                    </NavLink>
                                </li>
                                {/* if user is not null these links are shown */}
                                {user !== null && (
                                    <li className="nav-item" style={{ paddingLeft: '6%' }}>
                                        <NavLink className='nav-link' to='profile'>
                                            Profile
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route 
                        path='/' 
                        element={
                            <Login 
                                onLogin = {(user) => setUser(user)}
                            />
                            } 
                    />
                    <Route path='/leaderboard' element={<Leaderboard />} />
                    <Route 
                        path='/profile' 
                        element={
                            <Profile 
                                onSignOut = {() => setUser(null)}
                            />
                            } 
                    />
                    <Route path='/lift' element={<Lift />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className='mt-5'>
                    <div className="box bg-dark mb-0">
                        <p className="text-muted" style={{ marginTop: '1%', marginBottom: '1%', color: '#B5B5B0' }}>
                            &copy; 2023 Optimal Lifts, Inc. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
      );
    }

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
    
export default App;