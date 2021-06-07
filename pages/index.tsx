import * as React from 'react';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';

import Hero from '../components/Layout/Hero/Hero';
import MemberImage from '../components/UI/MemberImage/MemberImage';

import styles from '../assets/scss/pages/index.module.scss';

/* Server Side */
import DataReader from '../lib/node/class/DataReader/DataReader';

import { CustomDiv, CVLink } from '../components/UI/utils';

const Home = ({ about, homeContent, introduction }) => {

	const markDownOverrides = {
		img: { 
			component: MemberImage,
			props: {
				className: styles.memberImage
			}
		},
		p: CustomDiv,
		a: { component: CVLink, props: { className: styles.CVLink } }
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
				{/* <Markdown options={{ wrapper: 'article' }}>{homeContent}</Markdown> */}

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
	let homeContent: string;

	try {
		const dataReader = new DataReader('about', 'data/home');
		aboutUs = dataReader.getContent();

		dataReader.slug = 'home';
		homeContent = dataReader.getContent();

		teamIntroduction = weAre.map(name => {
			dataReader.slug = name;
			return {
				slug: name,
				content: dataReader.getContent()
			 };
		});

	} catch (error) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			about: aboutUs,
			homeContent: homeContent,
			introduction: teamIntroduction
		},
		revalidate: 60
	}
}

export default Home;