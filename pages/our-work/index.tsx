import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import Hero from '../../components/Layout/Hero/Hero';

/* Server Side */
import DataReader, { DataReaderReturnType } from '../../lib/node/class/DataReader/DataReader';
import MetaReader from '../../lib/node/class/MetaReader/MetaReader';
import CustomHead from '../../components/Layout/CustomHead/CustomHead';
import WithAnimation from '../../components/hoc/WithAnimation';

const OurWorkPage: React.FunctionComponent = (props: any): JSX.Element => {
    const { content, meta } = props;
    return (
        <>
            <CustomHead title={meta.title} description={meta.description} />
            <Hero>
                <h2>{meta.title}</h2>
                <p>{meta.description}</p>
            </Hero>
            <div className="container">
                <WithAnimation>
                    <Markdown>
                        {content}
                    </Markdown>
                </WithAnimation>
            </div>
        </>
    )
}

export async function getStaticProps() {
    let ourWorkContents: DataReaderReturnType;
    let ourProjects: DataReaderReturnType;
    let ourWorkMeta: object;
    const slug = 'our-work';

    const dataReader = new DataReader(slug, 'data');
    const metaReader = new MetaReader(slug);

    try {
        ourWorkContents = dataReader.getContent();
        ourWorkMeta = metaReader.getContent();

        dataReader.slug = '*';
        dataReader.dir = `data/${slug}`;
        ourProjects = dataReader.getContent();
    } catch (err) {
        console.log(err);
        return {
            notFound: true
        };
    }

    return {
        props: {
            content: ourWorkContents,
            projects: ourProjects,
            meta: ourWorkMeta
        }
    }
}

export default OurWorkPage;