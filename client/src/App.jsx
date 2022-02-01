import { Navbar, Home, Footer, Exchange, Details, Ledger } from './components'

const App = () => {
  return (
    <div className="min-h-screen color-nav">
      <div>
        <Navbar />
        <Home />
        <div className="flex-1 flex flex-col md:flex-row items-center">
          <Details />
          <Exchange />
        </div>
        <Ledger />
      </div>
      <div className="footer-black-glass">
        <Footer />
      </div>
    </div>
  );
}

export default App
