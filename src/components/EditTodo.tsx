import { Todo } from '../models/Todo';
import { useRef } from 'react';
import { TextField } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    editTextField: {
        width: "88%",
        margin: "0 16px"
    }
});

const EditTodo = (props: EditTodoProps) => {
    const classes = useStyles();
    const editTextRef = useRef<HTMLInputElement>(null);

    const saveTodo = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            props.updateTodo(props.todo.id, editTextRef?.current?.value || props.todo.name);
            if (editTextRef !== null && editTextRef.current !== null) {
                editTextRef.current.value = '';
            }
            props.setIsEditActive(false);
        }
    }

    return (
        <TextField
            className={classes.editTextField}
            label="Edit todo (click enter to save)" variant="standard"
            defaultValue={props.todo.name}
            onKeyDown={saveTodo}
            inputRef={editTextRef} />
    );
}

interface EditTodoProps {
    todo: Todo;
    updateTodo: (id: number, name: string) => void;
    setIsEditActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export default EditTodo;