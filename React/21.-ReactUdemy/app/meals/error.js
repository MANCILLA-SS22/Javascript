'use client'; // Error components must be Client Components

import React from 'react';

function Error() {
    return (
        <>
            <main className='error'>
                <h1>An error ocurred!</h1>
                <p>Failed to fetch meal data. Please try again later.</p>
            </main>
        </>
    )
}

export default Error;