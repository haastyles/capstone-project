import './styles/App.css';
import Header from './components/Header.jsx';
import Main from './components/Main.js';
import Footer from './components/Footer.jsx';
import About from './components/About.js';
import Menu from './components/Menu.js';
import ReserveTable from './components/ReserveTable.js';
import OrderOnline from './components/OrderOnline.js';
import logo from './images/nav-logo.svg';
import { Routes, Route } from 'react-router-dom';

function App() {

    const home =
        <>
            <Header />
            <Main />
            <Footer />
        </>

    const about =
        <>
            <Header />
            <About />
            <Footer />
        </>

    const menu =
        <>
            <Header />
            <Menu />
            <Footer />
        </>

    const reserve =
        <>
            <Header />
            <ReserveTable />
            <Footer />
        </>
    
    const order =
        <>
            <Header />
            <OrderOnline />
            <Footer />
        </>

  return (
      <>
          <meta name="description" content="Little Lemon is a family-owned restaurant that prides itself in serving fresh and unique Mediterranean cuisine within the Chicago area."/>
          <meta name="og:title" content="Little Lemon Restaurant"/>
          <meta name="og:description" content="Little Lemon is a family-owned restaurant that prides itself in serving fresh and unique Mediterranean cuisine within the Chicago area."/>
          <meta name="og:image" content={logo} />
          <Routes>
              <Route index element={home} />
              <Route path="/about" element={about} />
              <Route path="/menu" element={menu} />
              <Route path="/reserve-a-table" element={reserve}/>
              <Route path="/order" element={order}/>
          </Routes>
      </>
  );
}

export default App;
