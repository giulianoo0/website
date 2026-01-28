import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/blog-layout.tsx", [
      route("blog/mdx-showcase", "routes/blog/mdx-showcase.mdx")
  ])
] satisfies RouteConfig;
