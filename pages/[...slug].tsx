import * as React from 'react';
import Hero from '../components/Layout/Hero/Hero';
import { routes, staticPages } from '../lib/routes';

const DynamicPage = ({ data }) => {
    let content = null;
    if (data) {
        content = (<>
            <Hero>
                <h2>{data.title}</h2>
                <p>{data.description && data.description}</p>
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

    const pageData = getPageData(params);

    // SERVER STUFF
    return {
        props: { data: pageData },
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

const getPageData = (params: any): any => {
    const combinedRoutes = routes.concat(staticPages);
    const requestedUrl = getRequestUrl(params);
    return combinedRoutes.find( route => route.url === `/${requestedUrl}` );
}

const getRequestUrl = (params: any): string => {
    return params &&
        params.slug &&
        params.slug.length === 1 ? params.slug[0] : false;
}

const extractSlugs = (): string[] => {
    const mappedSlugs = routes.concat(staticPages).map(page => {
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