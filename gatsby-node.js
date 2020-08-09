const {createFilePath} = require(`gatsby-source-filesystem`);
const path = require("path");

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath: `pages`});
        const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
        const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
        const isPostOrPage = /posts|pages/.test(node.fileAbsolutePath);
        if(isPostOrPage){
            createNodeField({
                node,
                name: `postOrPageType`,
                value: `${/posts/.test(node.fileAbsolutePath) ? 'post' : 'page'}`
            });
        }
        createNodeField({
            node,
            name: `slug`,
            value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
        });
        createNodeField({
            node,
            name: `prefix`,
            value: separtorIndex ? slug.substring(1, separtorIndex) : ""
        });
    }
};

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const postsAndPages = await graphql(`{
        allMarkdownRemark(filter: {fields: {postOrPageType: {ne: null}}}) {
          edges {
            node {
              id
              fields {
                slug
                prefix
                postOrPageType
              }
            }
          }
        }
      }`,
    );
    if (postsAndPages.errors) {
        throw postsAndPages.errors;
    }
    const postTemplate = path.resolve("./src/templates/PostTemplate.js");
    const pageTemplate = path.resolve("./src/templates/PageTemplate.js");

    postsAndPages.data.allMarkdownRemark.edges.forEach(postOrPage => {
        const slug = postOrPage.node.fields.slug;
        const isPost = postOrPage.node.fields.postOrPageType === 'post';
        createPage({
            path: slug,
            component: isPost ? postTemplate : pageTemplate,
            context: {
                slug: slug
            }
        });
    })
}