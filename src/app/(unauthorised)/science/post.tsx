/*
    This code was developed from the tutorial present at the following link:
        https://www.caleblee.dev/blog/build-a-blog-with-next-14
    I do not claim ownership any code that was directly provided from the above link. 
*/

import { MDXRemote } from "next-mdx-remote/rsc";
import { Markdown } from "./markdown";
export function Post({ children }: { children: string }) {
  return (
    <MDXRemote
      source={children}
      options={{
        mdxOptions: {},
      }}
      components={Markdown}
    />
  );
}