import { IconButton, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Container } from "@mui/system";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        display: 'flex',
    },
    textSerach: {
        marginLeft: 1,
        flex: 1
    },
    iconSearch:{
        padding: '10px'
    }
});

const debounce = (func: Function, timeout = 300) => {
    let timer: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const SearchTodo = (props: SearchTodoProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <InputBase
                className={classes.textSerach}
                placeholder="Search todo"
                inputProps={{ 'aria-label': 'search todo' }}
                inputRef={props.searchInputRef}
                onKeyDown={debounce(props.onSearchTodo)}
            />
            <IconButton type="button" className={classes.iconSearch} aria-label="search" onClick={props.onSearchTodo} >
                <SearchIcon />
            </IconButton>
        </Container>
    );
}

interface SearchTodoProps {
    searchInputRef: React.Ref<HTMLInputElement> | undefined;
    onSearchTodo: () => void;
}
export default SearchTodo;