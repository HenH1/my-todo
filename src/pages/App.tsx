import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material';
import TodoAppBar from '../components/TodoAppBar';
import { createUseStyles } from 'react-jss';
import { theme } from '../theme';
import TodoList from '../components/TodoList';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
  },
  mainScreen: {
    flexGrow: 1
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme} >
      <Box component="main" className={classes.container}>
        <Box className={classes.mainScreen}>
          <TodoAppBar />
          <TodoList />
        </Box >
      </Box>
    </ThemeProvider>
  );
}

export default App;
