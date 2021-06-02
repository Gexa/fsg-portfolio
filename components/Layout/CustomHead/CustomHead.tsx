import * as React from 'react';
import Head from 'next/head';

const CustomHead = ({ title, description, type = 'article', language = 'en' }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="og:title" content={title} />
            <meta name="DC.Title" content={title} />

            <meta name="description" content={description && description} />
            <meta name="og:description" content={description && description} />
            <meta name="DC.Type" content={type} />
            <meta name="DC.Language" content={language} />
        </Head>
    )
}

export default CustomHead;