import { Navbar, Home, Footer, Exchange, Details, Ledger } from './components'

const App = () => {
  return (
    <div className="min-h-screen color-nav">
      <div id="home-container">
        <Navbar />
        <Home />
        <div className="flex-1 flex flex-col md:flex-row items-center mb-60" id="exchange-container">
          <Details />
          <Exchange />
        </div>
        <div id="ledger-container">
          <Ledger />
        </div>
      </div>
      <div className="footer-black-glass mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default App
