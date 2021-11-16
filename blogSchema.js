const{gql} = require('apollo-server')

const schema = gql`
"A blog written by a user"
      type Author {
        authorName: String!
        authorEmail: String
        }

    type Comment {
        commentID: ID!
        comment: String
        author: Author
        }

    type Blog {
        id: ID!
        title: String!
        body: String!
        author: Author!
        comments: [Comment]
        likes: Int
        unlikes: Int
    }
    type Query {
    blogs: [Blog!]!
    }
    type Mutation {
    "Post new blogs"    
    newPost( 
        title: String!
        body: String!
        authorName: String!
        authorEmail:String!):Blog, 
        "Update old blogs"
    updateBlog(
            id: ID!,
            title: String,
            body: String):Blog,
    
    "Delete blogpost"

    deleteBlog(id: ID!) : String,

    "Like a Blog"
    likeBlog(id: ID!) : Blog,

    "Unlike a blog"
    unlikeBlog(id: ID!) : Blog,

    "add comments to blogs"
    addComment(id:ID!, comment: String!, authorName : String!, authorEmail: String!) : Blog,

    "delete comment"
    deleteComment(commentID: ID!) : String,
}
`;
module.exports = blogschema;