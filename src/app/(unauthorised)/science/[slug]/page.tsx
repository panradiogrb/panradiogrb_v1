/*
    This code was developed from the tutorial present at the following link:
        https://www.caleblee.dev/blog/build-a-blog-with-next-14
    I have made several changes to the code in regards to styling & implementation within our project, which I claim as my own.
    I do not claim ownership any code that was directly provided from the above link. 
*/

import { getPost, getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Post } from "../post";


export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: {
    params: { slug: string }
}) {
    const post = await getPost(params.slug);
    if (!post) return notFound();

    

    return (
        <main className='bg-header bg-no-repeat bg-cover bg-center bg-fixed my-0 mx-0 text-center h-max min-h-screen w-full flex flex-col text-white'>
            <div className='z-10 flex flex-col justify-center content-center w-full bg-black/75 px-6 pt-10 rounded flex-1'>
                <div className='p-10 pb-20 bg-black/85 my-10 mt-0 self-center mx-5 text-justify rounded-xl flex-1'>
                    <h1 className='text-2xl pb-4 text-center'>{post.title.split('&%&')[0]}</h1>
                    <Post>{post.body}</Post>
                </div>
            </div>


            {/* FOOTER & BACKGROUND FADE STUFF */}
            <div className="sm:mt-0 mt-8 sm:border-t-0 border-t-white border-t-2 border-t-solid -bottom-2 left-0 w-full h-fit bg-black p-2 sm:p-0 z-10">
                <p className="text-white text-center my-3 text-sm sm:text-base">
                    We acknowledge the Gomeroi people as the Traditional Owners of the Observatory site of the Australia Telescope Compact Array.
                </p>
            </div>

            <div className='fixed w-full h-full -translate-y-[136px] bg-black/45 overflow-hidden overscroll-none'></div>
        </main>
    );
}