import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import Hero from '../components/Layout/Hero/Hero';
import {routes as routeMap } from '../lib/routes';

const DynamicPage = (props) => {
    let content = null;
    if (props) {
        content = (<>
            <Hero>
                <h2>Title...</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In a eligendi voluptatibus? Illo, architecto sit animi deleniti consequuntur exercitationem sequi, placeat, maxime qui et magni eos adipisci aut. Inventore reprehenderit quas, similique culpa praesentium aliquid nihil expedita ex vel temporibus dolor ratione. Officiis sit nam itaque, ipsum fugiat pariatur veritatis.</p>
            </Hero>
        </>);
    }

    return content;
}

export async function getStaticProps(context) {

    const { params } = context;

    if (!isUrlExists(params)) {
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
    const slugs = extractSlugs();

    return {
        paths: [
            { params: { slug: slugs } }
        ],
        fallback: 'blocking'
    }
}

const getRequestUrl = (params: any): string => {
    return params &&
        params.slug &&
        params.slug.length === 1 ? params.slug[0] : false;
}

const extractSlugs = (): string[] => {
    const mappedSlugs = routeMap.map( page => {
        const pageSlug = page.url.replace('/', '');
        return pageSlug;
    });

    return mappedSlugs;
}

const isUrlExists = (params: any): boolean => {
    const requestedUrl = getRequestUrl(params);
    const slugs = extractSlugs();
    return slugs.indexOf(requestedUrl) > -1;
}

export default DynamicPage;