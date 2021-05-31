import * as React from 'react';

const TeamMember = (props) => {
    return (
        <h2>{JSON.stringify(props)}</h2>
    )
}

export async function getStaticProps(context) {
    return {
        props: {}
    }
}

export async function getStaticPaths() {
    const names = ['ferenc', 'sandor', 'gergo' ].map( name => ({ params: { name: name }}));
    return {
        paths: names,
        fallback: 'blocking'
    }
}

export default TeamMember;