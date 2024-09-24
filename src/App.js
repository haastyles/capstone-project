import './App.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import logo from './images/nav-logo.svg';
function App() {
  return (
      <>
          <meta name="description" content="Little Lemon is a family-owned restaurant that prides itself in serving fresh and unique Mediterranean cuisine within the Chicago area."/>
          <meta name="og:title" content="Little Lemon Restaurant"/>
          <meta name="og:description" content="Little Lemon is a family-owned restaurant that prides itself in serving fresh and unique Mediterranean cuisine within the Chicago area."/>
          <meta name="og:image" content={logo} />
          <Header></Header>
          <Main></Main>
          <Footer></Footer>
      </>
  );
}

export default App;
