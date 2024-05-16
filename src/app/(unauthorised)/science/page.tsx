import { getPosts } from "@/lib/posts";
import Image from 'next/image'
import Link from "next/link";


export default async function Home() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-header bg-no-repeat bg-cover bg-center bg-fixed my-0 mx-0 text-center h-max w-full flex flex-col text-white">


                {/* POSTS SECTION */}
            <h1 className='text-3xl z-10 font-semibold'>POSTS</h1>
            <div className="w-full flex flex-col justify-center text-white font-bold items-end z-10 gap-10 pb-20 px-20 pt-10">
                {posts
                    .sort((a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((post) => (
                        <article key={post.slug} className='self-center bg-black/75 p-10 rounded-xl'>
                            <Link href={`/science/${post.slug}`} className='p-10 w-full flex flex-row gap-10'>
                                <div className='content-center'>
                                    <h1 className='text-xl'>{post.title}</h1>
                                    <p className='text-sm scale-90 opacity-85'>{post.date}</p>
                                    <p className='text-base'>{post.description}</p>
                                </div>
                                <Image className='rounded' src={'/posts/' + post.slug + '.jpg'} width={200} height={200} alt={post.title + ' alt'}></Image>
                            </Link>
                        </article>
                    ))}
            </div>

                    {/* PUBLICATIONS SECTION */}
            <div className='z-10 pb-20'>
                    <h1 className='text-3xl font-semibold'>PUBLICATIONS</h1>
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

