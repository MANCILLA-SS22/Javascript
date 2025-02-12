import ReactDOM from "react-dom/client";
// import { GuestList } from "./state/GuestList";
import { UserSearch } from "./state/UserSearch";
// import { EventComponents } from "./events/EventComponent";

function App(){
    return (
        <div>
            {/* <GuestList /> */}
            <UserSearch />
            {/* <EventComponents /> */}
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);