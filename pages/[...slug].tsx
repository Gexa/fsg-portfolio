import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import Hero from '../components/Layout/Hero/Hero';

const DynamicPage = (props) => {
    const router = useRouter();
    return (
        <>
            <Hero>
                <h2>Title...</h2>
                <p>{JSON.stringify(router)}</p>
            </Hero>
        </>
    );
}

export async function getStaticProps() {

    // SERVER STUFF
    return {
        props: {},
        revalidate: 600
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: ['team', 'our-work', 'technologies', 'contact'] } }
        ],
        fallback: true
    }
}

export default DynamicPage;