import React, { Children } from 'react'
import Navbar from './Navbar'

function BaseLayout() {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((isSidebarCollapsed) => !isSidebarCollapsed);
  };

  return (
    <div className='dashboard-content'>
      <Navbar onSidebarToggle={toggleSidebar}/>
      <main>{Children}</main>
    </div>
  )
}

export default BaseLayout
