import { useStaticQuery, graphql } from "gatsby";

export const useContent = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              subtitle
              tags
              tech
            }
            html
            id
          }
        }
      }
    }
  `);

  return data.allMarkdownRemark.edges.map((edge: unknown) => edge.node);
};
