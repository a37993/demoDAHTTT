import { useEffect } from 'react';
import Header from './Layout/Header';
import NavBar from './Layout/NavBar'
import Content from './Layout/Content';

function App() {
  useEffect(() => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      window.location.assign('/')
    } else {
    }
  }, [])

  return (
    <div className="app">
        <Header />
        <div style={{ 
          paddingTop: 70,
          height: '100%',
          display: 'flex',
        }}>
          <NavBar />
          <Content />
        </div>
    </div>
  );
}

export default App;
 