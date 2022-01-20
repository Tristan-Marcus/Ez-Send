import { Navbar, Home, Footer, Exchange, Ledger } from './components'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="color-nav">
        <Navbar />
        <Home />
      </div>
      <Exchange />
      <Ledger />
      <Footer />
    </div>
  );
}

export default App
