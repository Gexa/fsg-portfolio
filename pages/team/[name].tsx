import * as React from 'react';

const TeamMember = ({ name }) => {
    return (
        <div className="container">
            <h2>{name.toUpperCase()}</h2>
        </div>
    )
}

export async function getStaticProps(context) {
    const { params } = context;
    return {
        props: { name: params.name }
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