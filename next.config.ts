import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [
      [
        "@shikijs/rehype",
        {
          themes: { light: "github-light", dark: "github-dark" },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);