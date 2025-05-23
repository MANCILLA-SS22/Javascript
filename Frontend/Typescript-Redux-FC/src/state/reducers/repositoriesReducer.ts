import { Actions } from "../actions";
import { ActionType } from "../actions/action-types";

interface RepositoriesState {
    loading: boolean;
    error: string | null;
    data: string[]
};

const initialStaste = {
    loading: false,
    error: null,
    data: []
};

function reducer(state: RepositoriesState = initialStaste, action: Actions ): RepositoriesState {
    switch (action.type) {
        case ActionType.SEARCH_REPOSITORIES:
            return { loading: true, error: null, data: [] };
        case ActionType.SEARCH_REPOSITORIES_SUCCESS:
            return { loading: false, error: null, data: action.payload };
        case ActionType.SEARCH_REPOSITORIES_ERROR:
            return { loading: false, error: action.payload, data: [] };
        default:
            return state;
    };
};

export default reducer; 