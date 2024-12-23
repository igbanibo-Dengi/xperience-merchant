import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <Link href={"/events/1"}>
                Event 1
            </Link>
        </div>
    )
}

export default page