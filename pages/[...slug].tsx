import * as React from 'react';
import Hero from '../components/Layout/Hero/Hero';
import Markdown from 'markdown-to-jsx';

/* Server Side */
import { routes, staticPages } from '../lib/routes';
import DataReader from '../lib/node/class/DataReader/DataReader';
import MetaReader from '../lib/node/class/MetaReader/MetaReader';

const DynamicPage = ({ title, description, content }) => {

    let dynamicPageContent = null;
    if (content) {
        dynamicPageContent = (
        <>
            <Hero>
                <h2>{title}</h2>
                <p>{description && description}</p>
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

    return dynamicPageContent;
}

export async function getStaticProps(context) {

    const { params } = context;

    if (!isUrlExists(params)) {
        return {
            notFound: true
        }
    }

    const slug = getRequestedSlug(params);

    let pageData: string = '';
    let metaData: object;

    try {
        const dataReader = new DataReader(slug);
        const metaReader = new MetaReader(slug);

        pageData = dataReader.getContent();
        metaData = metaReader.getContent();
    } catch (error) {
        return {
            notFound: true,
            props: { error: error }
        }
    }

    // SERVER STUFF
    return {
        props: {
            ...metaData,
            content: pageData
         },
        revalidate: 600
    }
}

const isUrlExists = (params: any): boolean => {
    const requestedUrl = getRequestedSlug(params);
    const slugs = extractSlugs();
    return slugs.indexOf(requestedUrl) > -1;
}

const getRequestedSlug = (params: any): string => {
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

export async function getStaticPaths() {
    const slugs = extractSlugs();

    return {
        paths: [
            { params: { slug: slugs } }
        ],
        fallback: 'blocking'
    }
}

export default DynamicPage;