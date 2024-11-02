'use client'; // Error components must be Client Components

function Error() {
    return <>
        <main className='error'>
            <h1>An error ocurred!</h1>
            <p>Failed to fetch meal data. Please try again later.</p>
        </main>
    </>
}

export default Error;