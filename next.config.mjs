import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    
        //reactStrictMode: false         can disable this if rendering issues show up. on by default and causes all pages to be rendered twice during dev
    typescript: {
        ignoreBuildErrors: true,        //DANGEROUS AND ONLY SET TO TRUE FOR QUICK VERCEL BUILD
    }
};

const withMDX = createMDX({
    //withMDX is used to allow the project to read .mdx files for the blog system
})

export default withMDX(nextConfig);
