import './App.css';
import TabSet from './components/TabSet';
import Grid from '@mui/joy/Grid';

function App() {
  return (
    <div className="ChatGPT Roleplay">
      <header className="App-header">
        <Grid container sx={{ flexGrow: 1 }}>
          <TabSet />
        </Grid>
      </header>
    </div>
  );
}

export default App;
