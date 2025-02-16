import { Dispatch } from "redux";
import { ActionType } from "../actions/action-types"
import axios from "axios";
import { Actions } from "../actions";


function searchRepositories(term: string) {
    return async function(dispatch: Dispatch<Actions>){
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES,
        });

        try {
            const { data } = await axios.get("https://registry.npmjs.org/-/v1/search", { params: { text: term } });
            const names = data.objects.map(function(result: any){
                return result.package.name;
            });

            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: names,
            });
        } catch (err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.SEARCH_REPOSITORIES_ERROR,
                    payload: err.message,
                });
            };
        };
    };
};

export {searchRepositories};