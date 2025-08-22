import { Link } from 'react-router-dom'
import './Header.scss'
import { FaDocker, FaHome, FaRocket, FaServer } from 'react-icons/fa'
import useHasHeader from './hooks/useHasHeader'
import useActiveTab from './hooks/useActiveTab';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

function Header() {

  const isHeaderVisible = useHasHeader();
  const activeTab = useActiveTab();

  return (
    isHeaderVisible ? (
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>Harbour</h1>
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li><Link to="/server">
                <div className={`nav-item ${activeTab === 'server' ? 'active' : ''}`}>
                  <FaServer style={{ verticalAlign: 'middle', marginRight: '6px' }} size={20} />
                  <div>Server</div>
                </div>
              </Link></li>
              <li><Link to="/deploys">
                <div className={`nav-item ${activeTab === 'deploys' ? 'active' : ''}`}>
                  <FaRocket style={{ verticalAlign: 'middle', marginRight: '6px' }} size={20} />
                  <div>Deploys</div>
                </div>
              </Link></li>
              <li>
                <Link to="/docker">
                  <div className={`nav-item ${activeTab === 'docker' ? 'active' : ''}`}>
                    <FaDocker style={{ verticalAlign: 'middle', marginRight: '6px' }} size={20} />
                    <div>Docker</div>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-actions">
            <ThemeSwitcher />
          </div>
        </div>
      </header>
    ) : null
  )
}

export default Header
