import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import Hero from '../components/Layout/Hero/Hero';
import { pages as routeMap } from '../lib/pages/';

const DynamicPage = (props) => {
    const router = useRouter();
    return (
        <>
            <Hero>
                <h2>Title...</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In a eligendi voluptatibus? Illo, architecto sit animi deleniti consequuntur exercitationem sequi, placeat, maxime qui et magni eos adipisci aut. Inventore reprehenderit quas, similique culpa praesentium aliquid nihil expedita ex vel temporibus dolor ratione. Officiis sit nam itaque, ipsum fugiat pariatur veritatis.</p>
            </Hero>
        </>
    );
}

export async function getStaticProps(req) {

    const requestedUrl = req.params.slug[0];
    const slugs = routeMap.map( page => {
        const pageSlug = page.url.replace('/', '');
        return pageSlug;
    });
    if (slugs.indexOf(requestedUrl) === -1) {
        return {
            notFound: true
        }
    }

    // SERVER STUFF
    return {
        props: {},
        revalidate: 600
    }
}

export async function getStaticPaths() {

    const slugs = routeMap.map( page => {
        const pageSlug = page.url.replace('/', '');
        return pageSlug;
    });

    return {
        paths: [
            { params: { slug: slugs } }
        ],
        fallback: true
    }
}

export default DynamicPage;