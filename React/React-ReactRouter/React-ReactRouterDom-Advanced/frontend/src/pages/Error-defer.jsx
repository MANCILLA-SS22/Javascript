import { useAsyncError } from "react-router-dom";
import PageContent from "../components/PageContent";

function ReviewsError() {
    const error = useAsyncError();
    let title = "An error ocurred!";
    let message = "Something went wrong!";

    if (error.status === 500) message = error.statusText;
    if (error.status === 404){
        title = "Not found!"; 
        message = "Could not find resourse or page.";
    }

    return <>
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    </>
}

export {ReviewsError}