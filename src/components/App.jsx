import Gallery from './Gallery/Gallery';
import './styles.css';

export const App = () => {
  return (
    <div
      className="App"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Gallery />
    </div>
  );
};
