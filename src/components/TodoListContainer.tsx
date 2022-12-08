import { Container, List, ListSubheader, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Todo } from "../models/Todo";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";
import TodoItem from "./TodoItem";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        padding: "24px",
        height: "100%"
    },
    divider: {
        height: 30,
        margin: 0.5
    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    list: {
        width: '100%',
        maxWidth: '80%',
        paddingTop: '0',
        backgroundColor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        height: '80vh'
    },
    listHeader: {
        padding: '16px'
    }
});


const TodoListContainer = () => {
    const classes = useStyles();
    const [listTodo, setListToDo] = useState<Array<Todo>>([]);
    const [isSearch, setIsSearch] = useState<boolean>();

    const newTodoInput = useRef<HTMLInputElement>(null);
    const searchInput = useRef<HTMLInputElement>(null);

    const markTodo = (id: number) => {
        const newTodos = [...listTodo];
        // looking for the location of the selected todo, if exist
        const todoIndex = newTodos.findIndex((index) => index.id === id);
        if (todoIndex !== -1) {
            newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
            setListToDo(newTodos);
        }
    };

    const removeTodo = (id: number) => {
        const newTodos = [...listTodo];
        // looking for the location of the selected todo, if exist
        const todoIndex = newTodos.findIndex((index) => index.id === id);
        if (todoIndex !== -1) {
            newTodos.splice(todoIndex, 1);
            setListToDo(newTodos);
        }
    };

    const createNewId = () => {
        if (listTodo.length > 0) {
            return Math.max(...listTodo.map(todo => todo.id)) + 1;
        }
        else {
            return 1;
        }
    };

    const onSearchTodo = () => {
        if (searchInput !== null) {
            setIsSearch(true);
            // Doing re-render because search input doesn't change if there's text inside.
            setListToDo([...listTodo]);
        }
        else {
            setIsSearch(false);
        }
    };

    const getFilteredList = () => {
        let searchText: string = "";
        if (searchInput !== null && searchInput.current !== null) {
            searchText = searchInput.current.value;
        }
        // We can use includes for substring or startsWith for the begging of the sentence.
        return listTodo.filter((todo) => todo.name.startsWith(searchText));
    }

    const onClickAdd = () => {
        // clears search if exist
        if (newTodoInput !== null && newTodoInput.current !== null && newTodoInput.current.value !== '') {
            if (searchInput !== null && searchInput.current !== null) {
                searchInput.current.value = '';
            }
            setListToDo([...listTodo, { id: createNewId(), name: newTodoInput?.current?.value || "", completed: false }]);
            newTodoInput.current.value = '';
        }
    };

    const updateTodo = (id: number, newTodoName: string) => {
        const newTodos = [...listTodo];
        newTodos[newTodos.findIndex(todo => todo.id === id)].name = newTodoName;
        setListToDo(newTodos);
    }

    useEffect(() => {
        axios.get("https://jsonblob.com/api/jsonBlob/1037819956074659840").then((response) => {
            const todos: [Todo] = response.data.data;
            setListToDo(todos);
        });
    }, []);

    return (
        <Container className={classes.container}>
            <List sx={{ boxShadow: 3 }} className={classes.list} >
                <ListSubheader className={classes.listHeader}>
                    <Paper component="form" className={classes.paper}>
                        <AddTodo newTodoInput={newTodoInput} onClickAdd={onClickAdd} />
                        <Divider className={classes.divider} orientation="vertical" />
                        <SearchTodo searchInput={searchInput} onSearchTodo={onSearchTodo} />
                    </Paper>
                </ListSubheader>
                {(isSearch ?
                    getFilteredList() : listTodo).map((todo) =>
                        <TodoItem key={todo.id} todo={todo} markTodo={markTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
                    )}
            </List>
        </Container>
    );

}

export default TodoListContainer;