import * as React from 'react';
import styles from '../assets/scss/pages/index.module.scss';

import Hero from '../components/Layout/Hero/Hero';
import Markdown from 'markdown-to-jsx';

/* Server Side */
import DataReader from '../lib/node/class/DataReader/DataReader';

const Home = ({ about, introduction }) => {
	return (
		<div className={styles.container} data-test="component-home">
			<Hero>
				<Markdown>
				{about}
				</Markdown>
			</Hero>
			<section className="container members" id="WeAre">
				<header>
					<h2>We are...</h2>
					{introduction && introduction.map( (member, index) => {
						return (
							<article key={index} className="one-member">
								<Markdown>
									{member}
								</Markdown>
							</article>
						);
					} )}
				</header>
			</section>
		</div>
	)
}

export const getStaticProps = async () => {

	let aboutUs;
	let weAre = ['ferenc', 'sandor', 'gergo'];
	let teamIntroduction: string[];

	try {
		const dataReader = new DataReader('about', 'data/home');
		aboutUs = dataReader.getContent();
		teamIntroduction = weAre.map(name => {
			dataReader.slug = name;
			return dataReader.getContent();
		});

	} catch (error) {
		console.log(error);
		return {
			notFound: true,
			props: {
				error: error
			}
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