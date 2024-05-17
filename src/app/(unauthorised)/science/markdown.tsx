/*
    This code was developed from the tutorial present at the following link:
        https://www.caleblee.dev/blog/build-a-blog-with-next-14
    I do not claim ownership any code that was directly provided from the above link. 
*/

import { MDXComponents } from "mdx/types";

export const Markdown: MDXComponents = {
  a: ({ children, ...props }) => {
    return (
      <a
        {...props}
        className="underline hover:text-blue-600 duration-100"
        target="_blank"
      >
        {children}
      </a>
    );
  },
};