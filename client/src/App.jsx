import { Navbar, Home, Footer, Exchange, Details, Ledger } from './components'

const smallDeviceExchange = () => (
  <div className="flex-1 flex flex-row items-center sm:flex-col">
    <Exchange />
    <Details />
  </div>
)

const mediumDeviceExchange = () => (
  <div className="flex-1 flex flex-row items-center sm:flex-col">
    <Details />
    <Exchange />
  </div>
)



const App = () => {
  return (
    <div className="min-h-screen">
      <div className="color-nav">
        <Navbar />
        <Home />
        <div className="flex-1 flex flex-col md:flex-row items-center">
          <Details />
          <Exchange />
        </div>
        <Ledger />
      </div>
      <Footer />
    </div>
  );
}

export default App
