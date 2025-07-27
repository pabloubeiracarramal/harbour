import { Link } from 'react-router-dom'
import './Header.scss'
import { FaDocker, FaHome, FaRocket, FaServer } from 'react-icons/fa'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Harbour</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/">
              <div className='nav-item'>
                <FaHome style={{ verticalAlign: 'middle', marginRight: '6px' }} size={20} />
                <div>Home</div>
              </div>
            </Link></li>
            <li><Link to="/deploys">
              <div className='nav-item'>
                <FaRocket style={{ verticalAlign: 'middle', marginRight: '6px' }} size={20} />
                <div>Deploys</div>
              </div>
            </Link></li>
            <li><Link to="/server">
              <div className='nav-item'>
                <FaServer style={{ verticalAlign: 'middle', marginRight: '6px' }} size={20} />
                <div>Server</div>
              </div>
            </Link></li>
            <li>
              <Link to="/docker">
                <div className='nav-item'>
                  <FaDocker style={{ verticalAlign: 'middle', marginRight: '6px' }} size={20} />
                  <div>Docker</div>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
