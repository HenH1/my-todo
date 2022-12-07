import { Todo } from '../models/Todo';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRef, useState } from 'react';
import { Container, TextField } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    listItem: {
        padding: "0 16px",
    },
    editTextField: {
        width: "88%",
        margin: "0 16px"
    },
});

const TodoItem = (props: TodoItemProps) => {
    const classes = useStyles();
    const labelId = `checkbox-list-label-${props.todo.id}`;
    const [isEditActive, setIsEditActive] = useState(false);
    const editTextRef = useRef<HTMLInputElement>(null);

    const saveTodo = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            props.updateTodo(props.todo.id, editTextRef?.current?.value || props.todo.name);
            if (editTextRef !== null && editTextRef.current !== null) {
                editTextRef.current.value = '';
            }
            setIsEditActive(!isEditActive);
        }
    }

    return (
        <ListItem
            key={labelId}
            className={classes.listItem}
            secondaryAction={
                <Container>
                    <IconButton edge="end" aria-label="edit" onClick={() => setIsEditActive(!isEditActive)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="remove" onClick={() => props.removeTodo(props.todo.id)}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Container>
            }
            disablePadding>
            {isEditActive ?
                <TextField
                    className={classes.editTextField}
                    onClick={(e) => e.stopPropagation()}
                    label="Edit todo (click enter to save)" variant="standard"
                    defaultValue={props.todo.name}
                    onKeyDown={saveTodo}
                    inputRef={editTextRef} /> :
                <ListItemButton role={undefined} onClick={() => props.markTodo(props.todo.id)} dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={props.todo.completed}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>
                    <ListItemText style={{ textDecorationLine: props.todo.completed ? "line-through" : "" }} id={labelId} primary={props.todo.name} />
                </ListItemButton>}
        </ListItem>
    );
}

interface TodoItemProps {
    todo: Todo;
    markTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    updateTodo: (id: number, name: string) => void;
}
export default TodoItem;