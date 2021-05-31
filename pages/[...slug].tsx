import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import Hero from '../components/Layout/Hero/Hero';

const DynamicPage = (props) => {
    const router = useRouter();
    return (
        <>
            <Hero>
                <h2>Title...</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In a eligendi voluptatibus? Illo, architecto sit animi deleniti consequuntur exercitationem sequi, placeat, maxime qui et magni eos adipisci aut. Inventore reprehenderit quas, similique culpa praesentium aliquid nihil expedita ex vel temporibus dolor ratione. Officiis sit nam itaque, ipsum fugiat pariatur veritatis.</p>
            </Hero>
        </>
    );
}

export async function getStaticProps() {

    // SERVER STUFF
    return {
        props: {},
        revalidate: 600
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: ['team', 'our-work', 'technologies', 'contact'] } }
        ],
        fallback: true
    }
}

export default DynamicPage;