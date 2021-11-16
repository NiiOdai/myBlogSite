const {ApolloServer,gql} = require("apollo-server");
// const BlogDB = require('./mongooseSchema');
const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://admin:admin@cluster0.6rvcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const port = process.env.PORT || 8000;

uid = uuidv4()
const blogs = [
    {
        id: 1,
        title: "Micheal Soli",
        body: "Lorem ipsum datum larium lorem",
        author: {
            authorName: "Nana Bonsu",
            authorEmail: "Michaelsoli@gmail.com"
        }
    },

    {
        id: 2,
        title: "Nii Odai",
        body: "Lorem ipsum adshj zkxsdnvksl lasdkcnsem",
        author: {
            authorName: "Nii oDai",
            authorEmail: "niibiodai@gmail.com"
        }
    },

    {
        id: 3,
        title: "Odai Mathias",
        body: "Lorem ipsum datum larium lorem",
        author: {
            authorName: "Okleymensah",
            authorEmail: "mkookley-mensahn@gmail.com"
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
        "Update blogs"
    updateBlog(
            id: ID!,
            title: String,
            body: String):Blog,
    
    "Delete blog"

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

const blogResolvers = {
    Query: {
        blogs: () => {
            client.connect()
            const collection = client.db("test").collection("blogs");
            results = collection.find({}).toArray()
            // client.close();
            return results

           
        
    }
},
     
    Mutation: {
        newPost:(parent,args,context,info) =>{
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
        client.connect()
            const collection = client.db("test").collection("blogs");
            collection.insertOne(myBlog)
            return myBlog           
            },
        updateBlog(parent,args,context,info) {
            const { id, title, body } = args
            client.connect()
            const collection = client.db("test").collection("blogs");
            filter = { id: id }
            if (title !== undefined) {
                    const updateDoc = {
                     $set: {
                        title: title
                    },
                };
                results = collection.updateOne(filter, updateDoc)
            }

            if (body !== undefined) {
                const updateDoc = {
                    $set: {
                        body: body
                    },
                };
                results = collection.updateOne(filter, updateDoc)
            }
            return collection.findOne({ id: id })
        },

        deleteBlog(parent, args, context, info) {
            const { id } = args
            const doc = {
               id: id
            }
            client.connect()
            const collection = client.db("test").collection("blogs");
            try {
                deleteResults = collection.deleteOne(doc)
                return "Blog deleted successfully"
            } catch (e) {
                return `Something went wrong, Error ${e}`
            }

        },
        likeBlog(args) {
            const { id } = args
            client.connect()
            const collection = client.db("test").collection("blogs");
            filter = { id: id }
            // temp = collection.findOne(filter)
            const updateDoc = {
                $inc: {
                    likes: 1
                },
            };
            results = collection.updateOne(filter, updateDoc)
            return collection.findOne(filter)
        },

        unlikeBlog(args) {
            const { id } = args
            client.connect()
            const collection = client.db("test").collection("blogs");
            filter = { id: id }
            // temp = collection.findOne(filter)
            const updateDoc = {
                $inc: {
                    unlikes: 1
                },
            };
            results = collection.updateOne(filter, updateDoc)
            return collection.findOne(filter)
        },
        addComment(args) {
            const { id, comment, authorName, authorEmail } = args
            client.connect()
            const collection = client.db("test").collection("blogs");
            filter = { id: id }
            uid = uuidv4();

            commentObj = {
                commentID: uid,
                comment: comment,
                author: {
                    authorName,
                    authorEmail
                }
            }
            const updateDoc = {
                $push: {
                    comments: {
                        $each: [commentObj]
                    }
                },
            };
            results = collection.updateOne(filter, updateDoc)
            return collection.findOne(filter)
        },

        deleteComment(args) {
            const { commentID } = args

            const doc = {
                commentID: commentID
            }
            client.connect()
            const collection = client.db("test").collection("blogs");
            try {
                deleteResults = collection.deleteOne(doc)
                return "Comment deleted successfully"
            } catch (e) {
                return `Something went wrong, error ${e}`
            }
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