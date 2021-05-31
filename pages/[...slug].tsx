import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import Hero from '../components/Layout/Hero/Hero';
import { routes } from '../lib/routes';

const DynamicPage = (props) => {
    let content = null;
    if (props) {
        content = (<>
            <Hero>
                <h2>Title...</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, error earum blanditiis omnis doloribus quo dolore vero aut quia? Obcaecati?</p>
            </Hero>
        </>);
    }

    return content;
}

export async function getStaticProps(context) {

    const { params } = context;

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
    const mappedSlugs = routes.map(page => {
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