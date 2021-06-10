import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import Hero from '../../components/Layout/Hero/Hero';
import CustomHead from '../../components/Layout/CustomHead/CustomHead';
import WithAnimation from '../../components/hoc/WithAnimation';
import { ProjectLink } from '../../components/UI/utils';
import Gallery from '../../components/UI/Gallery/Gallery';

import styles from '../../assets/scss/pages/our-work.module.scss';

/* Server Side */
import DataReader, { DataReaderReturnType } from '../../lib/node/class/DataReader/DataReader';
import MetaReader from '../../lib/node/class/MetaReader/MetaReader';

const OurWorkPage: React.FunctionComponent = (props: any): JSX.Element => {
    const { content, projects, meta } = props;
    const [ projectId, setProjectId ] = React.useState( '' );

    React.useEffect( () => {
        if (projectId.length && projects[projectId]) {
            const projectsSection = document.querySelector(`section.${styles.ourWork}`)! as HTMLElement;
            const projectTop = +projectsSection.offsetTop;
            document.querySelector('html, body').scrollTo({
                top: projectTop,
                behavior: 'smooth'
            });
        }
    }, [ projectId ])

    const handleShowProject = (event, projectId: string) => {
        event.preventDefault();
        setProjectId( (_pid) => {
            return projectId;
        });
    }

    const markdownOverride = {
        a: {
            component: ProjectLink,
            props: {
                handleClick: handleShowProject
            }
        }
    };

    return (
        <>
            <CustomHead title={meta.title} description={meta.description} />
            <Hero>
                <h2>{meta.title}</h2>
                <p>{meta.description}</p>
            </Hero>
            <div className="container">
                <section className={styles.ourWork}>
                <WithAnimation>
                    <Markdown options={{ wrapper: 'article', overrides: markdownOverride }}>
                        {content}
                    </Markdown>
                    <section id={styles.Projects}>
                        {projectId !== '' && projects[projectId] ? (<Markdown options={{
                            overrides: {
                                gallery: {
                                    component: Gallery
                                }
                            }
                        }}>{projects[projectId]}</Markdown>) : null}
                    </section>
                </WithAnimation>
                </section>
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