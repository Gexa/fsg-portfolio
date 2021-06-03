import * as React from 'react';
import { routes } from '../../lib/routes';
import Markdown from 'markdown-to-jsx';
import CustomHead from '../../components/Layout/CustomHead/CustomHead';

import { CustomDiv, CVLink } from '../../components/UI/utils';
import MemberImage from '../../components/UI/MemberImage/MemberImage';

import styles from '../../assets/scss/pages/team.module.scss';

/* Server Side */
import DataReader from '../../lib/node/class/DataReader/DataReader';

const TeamMember = ({ data }) => {


	const markDownOverrides = {
		img: { 
			component: MemberImage,
			props: {
				className: styles.cvImage
			}
		},
		p: CustomDiv,
        /* Avoid redirect from site */
        a: props => <a href={props.href} target="_blank">{props.children}</a>
	};


    return (
        <>
            <CustomHead title={data.title} description={data.description} />
            <div className="container">
                {data.content && (
                <Markdown className={styles.CV} options={{ wrapper: 'article', overrides: markDownOverrides }}>
                    {data.content}
                </Markdown>
                )}
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    const { params } = context;
    const teamMemberData = getTeamMember(params);

    return {
        props: { data: teamMemberData }
    }
}

export async function getStaticPaths() {
    const userRoutes = filterUserRoutes();
    const names = userRoutes.map( route => ({ 
        params: { 
            name: route.url.replace(new RegExp('/', 'g'), '')
        }
    }) );

    return {
        paths: names,
        fallback: 'blocking'
    }
}

const filterUserRoutes = () => {
    return routes.find( route => route.url === '/team' ).sub;
}

const getTeamMember = (params: any): any => {
    const userRoutes = filterUserRoutes();
    const slug = params.name;

    if (!isSlugValid(slug)) {
        return false;
    }

    const fullURL = `/${slug}`;
    const memberMetaData = userRoutes.find( route => route.url === fullURL );
    let memberCV: string = '';

    try {
        const dataReader = new DataReader(slug, 'data/team');
        memberCV = dataReader.getContent();
    } catch (error) {
        return false;
    }

    return {
        ...memberMetaData,
        content: memberCV
    };
}

const isSlugValid = (slug: string): boolean => {
    return slug && slug.trim().length > 0;
}

export default TeamMember;