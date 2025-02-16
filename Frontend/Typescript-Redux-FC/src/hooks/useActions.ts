import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";


function useActions(){
    const dispatch = useDispatch();
    return bindActionCreators(actionCreators, dispatch);
    // dispatch(actionCreators.searchRepositories(term) as any);
};

export {useActions}