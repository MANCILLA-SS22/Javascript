'use client'; // Error components must be Client Components

import React from 'react';

function Error() {
    return (
        <>
            <main className='error'>
                <h1>An error ocurred!</h1>
                <p>Failed to create meal. Please try again later.</p>
            </main>
        </>
    )
}

export default Error;