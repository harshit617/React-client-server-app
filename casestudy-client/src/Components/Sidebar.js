import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            sidebar:false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.showSidebar = this.showSidebar.bind(this);
    }

    handleLogout(){
        localStorage.removeItem('auth');
        localStorage.removeItem('authenticated');
        localStorage.removeItem('id');
        localStorage.setItem('isAuth', "false");
        console.log(localStorage);
    }

    showSidebar(){
        const sb = this.state.sidebar;
        this.setState(state => ({
            sidebar: !sb
        }))
    }
    render() { 
        return (    <div>
            <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={this.showSidebar} />
          </Link>
        </div>
        <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={this.showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
                  
                <li className="nav-text"><Link to={{pathname: `/updateuser/${this.props.id}`}}><span>Update User</span></Link></li>
                <li className="nav-text"><Link to='/logout'><span><span onClick={this.handleLogout}>Logout</span></span></Link></li>
              </ul>
        </nav>
      </IconContext.Provider>
        </div>  );
    }

}

export default Sidebar;


 