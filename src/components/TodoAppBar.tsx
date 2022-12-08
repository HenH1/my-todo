import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  headline: {
    color: "white"
  },
  container: {
    flexGrow: 1
  },
  icon: {
    marginRight: 2
  },
  textHeadline: {
    fontWeight: 'bold',
  }
});

const TodoAppBar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.headline}>
          <AssignmentIcon className={classes.icon} />
          <Typography variant="h4" component="div" className={classes.textHeadline}>
            My todo list
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TodoAppBar;