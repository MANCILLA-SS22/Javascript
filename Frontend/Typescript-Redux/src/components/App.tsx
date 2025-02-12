import React, { JSX } from "react";
import { StoreState } from "../reducers/main";
import { deleteTodo, fetchTodos, Todo } from "../actions/main";
import { connect } from "react-redux";

interface AppProps {
    todos: Todo[];
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo
}

interface AppState {
    fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps){
        super(props);

        this.state = {fetching: false};
    }

    componentDidUpdate(prevProps: AppProps): void {
        if(!prevProps.todos.length && this.props.todos.length) this.setState({fetching: false});
    }
    
    onButtonClick = (): void => {
        this.props.fetchTodos();
        this.setState({fetching: true});
    }

    onTodoClick = (id: number): void => {
        this.props.deleteTodo(id);
    };

    render(): React.ReactNode {
        return <div>
            <button onClick={this.onButtonClick}>Fetch</button>
            {this.state.fetching ? 'LOADING' : null}
            {this.renderList()}
        </div>
    }

    renderList(): JSX.Element[] {
        return this.props.todos.map((todo: Todo) => {
            return (
                <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
                    {todo.title}
                </div>
            )
        })
    }
};

function mapStateToProps(state: StoreState): { todos: Todo[] } {
    return { todos: state.todos };
};

const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);

export { App };