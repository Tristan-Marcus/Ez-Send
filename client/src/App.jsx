import { Navbar, Home, Footer, Exchange, Ledger } from './components'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="color-nav">
        <Navbar />
        <Home />
        <Exchange/>
        <Ledger />
      </div>
      <Footer />
    </div>
  );
}

export default App
