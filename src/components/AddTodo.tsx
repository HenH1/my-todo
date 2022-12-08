import { IconButton, InputBase, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        display: "flex"
    },
    textField: {
        marginLeft: 1,
        flex: 1
    },
    iconAdd: {
        padding: '10px'
    },
});

const AddTodo = (props: AddTodoProps) => {
    const classes = useStyles();

    const checkIfEnterPressed = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            props.onClickAdd();
        }
    }

    return (
        <Container className={classes.container}>
            <InputBase
                placeholder="Add todo"
                inputProps={{ 'aria-label': 'add todo' }}
                inputRef={props.newTodoInputRef}
                onKeyDown={checkIfEnterPressed}
                className={classes.textField}
            />
            <IconButton type="button" className={classes.iconAdd} aria-label="add" onClick={props.onClickAdd}>
                <AddIcon />
            </IconButton>
        </Container>
    );
}

interface AddTodoProps {
    newTodoInputRef: React.Ref<HTMLInputElement> | undefined;
    onClickAdd: () => void;
}
export default AddTodo;