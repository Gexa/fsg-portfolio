import * as React from 'react';
import styles from '../assets/scss/pages/index.module.scss';

import Hero from '../components/Layout/Hero/Hero';
import MemberImage from '../components/UI/MemberImage/MemberImage';

import Markdown from 'markdown-to-jsx';

/* Server Side */
import DataReader from '../lib/node/class/DataReader/DataReader';
import { useRouter } from 'next/dist/client/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Div to replace Markdown paragraphs */
const CustomDiv: React.FunctionComponent = props => <div {...props} />
const CVLink: React.FunctionComponent = props => <span className={styles.CVLink}>{props.children} <FontAwesomeIcon icon={['fas', 'file-code']} /></span>

const Home = ({ about, introduction }) => {

	const markDownOverrides = {
		img: { 
			component: MemberImage,
			props: {
				className: styles.memberImage
			}
		},
		p: CustomDiv,
		a: CVLink
	};

	const router = useRouter();

	return (
		<div className={styles.container} data-test="component-home">
			<Hero>
				<Markdown>
				{about}
				</Markdown>
			</Hero>
			<section className={['container', styles.members].join(' ')} id="WeAre">
				<header>
					<h2>We are...</h2>
				</header>
				<div className={styles.articles}>
					{introduction && introduction.map( (member, index) => {
						return (
							<article key={index} className={styles.oneMember}>
								<Markdown onClick={() => router.push(`/team/${member.slug}`)} className={styles.oneMemberInner} options={{ wrapper: 'div', overrides: markDownOverrides }}>
									{member.content}
								</Markdown>
							</article>
						);
					} )}
				</div>
			</section>
		</div>
	)
}

export const getStaticProps = async () => {

	const weAre = ['ferenc', 'sandor', 'gergo'];
	let aboutUs: string;
	let teamIntroduction: object[];

	try {
		const dataReader = new DataReader('about', 'data/home');
		aboutUs = dataReader.getContent();

		teamIntroduction = weAre.map(name => {
			dataReader.slug = name;
			return { slug: name, content: dataReader.getContent() };
		});

	} catch (error) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			about: aboutUs,
			introduction: teamIntroduction
		},
		revalidate: 60
	}
}

export default Home;