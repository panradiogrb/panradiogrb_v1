/*
    Portions of this code was developed from the tutorial present at the following link:
        https://www.caleblee.dev/blog/build-a-blog-with-next-14
    I have made several changes to the code in regards to styling & implementation within our project, which I claim as my own.
    I do not claim ownership any code that was directly provided from the above link. 
*/

import { getPosts } from "@/lib/posts";
import Image from 'next/image'
import Link from "next/link";


export default async function Home() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-header bg-no-repeat bg-cover bg-center bg-fixed my-0 mx-0 text-center h-max w-full flex flex-col text-white">


            {/* POSTS SECTION */}
            <h1 className='text-3xl z-10 font-semibold'>POSTS</h1>
            <div className="w-full flex flex-col text-white font-bold items-end z-10 gap-10 pb-20 px-20 pt-10 flex-1">

                {posts.length === 0 ? (<div>no posts</div>) :
                    (posts
                        .sort((a, b) =>
                            new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((post) => (
                            <article key={post.slug} className='self-center bg-black/85 p-10 rounded-xl'>
                                <Link href={`/science/${post.slug}`} className='p-10 w-full flex flex-row gap-10'>
                                    <div className='content-center'>
                                        <h1 className='text-xl'>{post.title}</h1>
                                        <p className='text-sm scale-90 opacity-85'>{post.date}</p>
                                        <p className='text-base'>{post.description}</p>
                                    </div>
                                </Link>
                            </article>
                        )))
                }

            </div>

            {/* PUBLICATIONS SECTION */}
            <div className="w-full text-white items-end z-10 bg-black/75 text-center pb-16">
                <h1 className='text-3xl z-10 font-semibold py-3 pb-4'>PUBLICATIONS</h1>
                <ul className='list-disc text-justify px-20'>
                    <li>
                        Levan et al. (2024), <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/abs/2024Natur.626..737L/abstract'>Heavy-element production in compact object merger observed by JWST</Link>, Nature, 626, 737, <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/link_gateway/2024Natur.626..737L/doi:10.1038/s41586-023-06759-1'>DOI: 10.1038/s41586-023-06759-1</Link>
                    </li>
                    <li>
                        Giarratana et al. (2023), <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/abs/2023arXiv231105527G/abstract'>The expansion of the GRB 221009A afterglow </Link>, arXiv:2311.05527, <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/link_gateway/2023arXiv231105527G/doi:10.48550/arXiv.2311.05527'>DOI: 10.48550/arXiv.2311.05527</Link>
                    </li>
                    <li>
                        Bright & Rhodes et al. (2023), Precise measurements of self-absorbed rising reverse shock emission from gamma-ray burst 221009A, Nature Astronomy, 7, 986, <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/link_gateway/2023NatAs...7..986B/doi:10.1038/s41550-023-01997-9'>DOI: 10.1038/s41550-023-01997-9</Link>
                    </li>
                    <li>
                        Anderson et al. (2023), <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/abs/2023MNRAS.523.4992A/abstract'>Rapid radio brightening of GRB 210702A</Link>, Monthly Notices of the Royal Astronomical Society, 523, 4992, <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/link_gateway/2023MNRAS.523.4992A/doi:10.1093/mnras/stad1635'>DOI: 10.1093/mnras/stad1635</Link>
                    </li>
                    <li>
                        Anderson et al. (2021), <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/abs/2021MNRAS.503.4372A/abstract'>Rapid-response radio observations of short GRB 181123B with the Australia Telescope Compact Array</Link>, Monthly Notices of the Royal Astronomical Society, 503, 4372, <Link className='hover:underline text-purple-text' href='https://ui.adsabs.harvard.edu/link_gateway/2021MNRAS.503.4372A/doi:10.1093/mnras/stab727'>DOI: 10.1093/mnras/stab727</Link>
                    </li>
                </ul>
            </div>

            <div className="sm:mt-0 mt-8 sm:border-t-0 border-t-white border-t-2 border-t-solid -bottom-2 left-0 w-full h-fit bg-black p-2 sm:p-0 z-10">
                <p className="text-white text-center my-3 text-sm sm:text-base">
                    We acknowledge the Gomeroi people as the Traditional Owners of the Observatory site of the Australia Telescope Compact Array.
                </p>
            </div>

            <div className='fixed w-full h-svh -translate-y-[136px] bg-black/45 overflow-hidden'></div>

        </main>
    )
}

