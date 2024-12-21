import './App.css';
import Rhythms from './Components/Rhythm/Rhythm';
import Clock from './Components/Clock/Clock';
import MetronomeProvider from './Components/Contexts/MetronomeContent';
import Header from './Components/Header/Header';
function App() {
  return (
    <>
      <Header />
      <MetronomeProvider>
        <main id="main-container">
          <div id="left" className="flex-col box-shadow">
            <Clock />
          </div>
          <div id="right" className="flex-col box-shadow">
            <Rhythms />
          </div>
        </main>
      </MetronomeProvider>
    </>
  );
}

export default App;
