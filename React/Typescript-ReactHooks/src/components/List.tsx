import { ReactNode } from 'react'

interface ListProps<T> {
    items: T[],
    render: (item: T) => ReactNode //ReactNode is a type that describes what React can render.
}

function List<T>({ items, render }: ListProps<T>) {
    return (
        <ul>
            {
                items.map(function (item, i) {
                    return <>
                        <li key={i}>
                            {render(item)}
                        </li>
                    </>
                })
            }
        </ul>
    )
}
export default List;