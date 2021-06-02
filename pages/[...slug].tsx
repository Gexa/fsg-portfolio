import * as React from 'react';
import Hero from '../components/Layout/Hero/Hero';
import { routes, staticPages } from '../lib/routes';
import Markdown from 'markdown-to-jsx';
import DataReader from '../lib/node/class/DataReader/DataReader';

const DynamicPage = ({ data }) => {
    let content = data.content && data.content;
    if (data) {
        content = (
        <>
            <Hero>
                <h2>{data.title}</h2>
                <p>{data.description && data.description}</p>
            </Hero>
            <div className="container">
                {content && (
                <article>
                    <Markdown>
                        {content}
                    </Markdown>
                </article>
                )}
            </div>
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
    if (!pageData) {
        return {
            notFound: true
        }
    }
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
    const slug = getRequestUrl(params);

    if (!slug) {
        return false;
    }

    const fullURL = `/${slug}`;
    const metaData = combinedRoutes.find( route => route.url === fullURL );
    let pageData: string = '';

    try {
        const dataReader = new DataReader(slug);
        pageData = dataReader.get();
    } catch (error) {
        console.log(error);
        return false;
    }

    return {
        ...metaData,
        content: pageData
    };
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