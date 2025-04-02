import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

export const useImages = (title: string) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(width: 1000, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);

  const images: Record<string, IGatsbyImageData[]> = {};

  title = title?.toLowerCase();

  data.allFile.edges.forEach(({ node }) => {
    const image = getImage(node.childImageSharp);
    if (image) {
      if (!node.relativePath.includes(title)) return;
      if (!images[title]) {
        images[title] = [];
      }
      images[title].push(image);
    }
  });

  return images;
};
