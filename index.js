const {ApolloServer,gql} = require("apollo-server")
const { v4: uuidv4 } = require('uuid');

// const port = process.env.PORT || 8000;

uid = uuidv4()
const blogs = [
    {
        id: 1,
        title: "Ananse",
        body: "Lorem ipsum datum larium lorem",
        author: {
            authorName: "Nana Bonsu",
            authorEmail: "nanabon@gmail.com"
        }
    },

    {
        id: 2,
        title: "Ananse",
        body: "Lorem ipsum datum larium lorem",
        author: {
            authorName: "Nana Bonsu",
            authorEmail: "nanabon@gmail.com"
        }
    },

    {
        id: 3,
        title: "Ananse",
        body: "Lorem ipsum datum larium lorem",
        author: {
            authorName: "Nana Bonsu",
            authorEmail: "nanabon@gmail.com"
        }
    },
];
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
    "Creat blogs"    
    newPost( 
        title: String!
        body: String!
        authorName: String!
        authorEmail:String!):Blog, 

}


`;

const blogResolvers = {
    Query: {
        blogs: () => blogs         
        
    },
     
    Mutation: {
        newPost:(parent, args) =>{
            const { title, body, authorName, authorEmail} = args;
           
            const myBlog = {
                id: uid,
                title,
                body,
                author:{ authorName,
                        authorEmail
                    },
                likes:0,unlikes:0,comments:[] };
        blogs.push(myBlog);
            return myBlog;
            }
        }

}



const server = new ApolloServer({
    typeDefs:schema,
    resolvers:blogResolvers,
    playground:true,
    introspection:true
   
});
server.listen(3000).then(({url}) =>{
    console.log(`Server ready at ${url}`);
}).catch(err => console.log(err.message));