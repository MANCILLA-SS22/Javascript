// import { Child } from './Child'
import { ChildAsFC1 } from './Child'
// import { ChildAsFC2 } from './Child'

function Parent() {
    return (
        <ChildAsFC1 color="red" onClick={() => console.log("Click!")}>
            sssss
        </ChildAsFC1>
    )
}

export default Parent