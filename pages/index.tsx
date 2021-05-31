import * as React from 'react';
import styles from '../assets/scss/pages/index.module.scss';

import Hero from '../components/Layout/Hero/Hero';

const Home = ({ data }) => {
  return (
    <div className={styles.container} data-test="component-home">
      <Hero>
        <h2>{data && data.title}</h2>
        <p>{data && data.description}</p>
      </Hero>
    </div>
  )
}

export const getStaticProps = async () => {
  const dummyData = {
    title: 'About',
    description: 'Experienced Full-Stack developer team with tons of successfully started and maintained projects. We are proud of our happy and satisfied clients.'
  }

  return {
    props: {
      data: dummyData
    },
    revalidate: 60
  }
}

export default Home;