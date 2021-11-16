const {ApolloServer} = require("apollo-server");
const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require("mongodb");
const blogSchema = require('./blogSchema');
const blogResolvers = require('./blogResolvers');


const uri = "mongodb+srv://admin:admin@cluster0.6rvcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const PORT = process.env.PORT || 4000;

uid = uuidv4()
const blogs = [
    {
        id: 1,
        title: "Micheal Soli",
        body: "Lorem ipsum datum larium lorem",
        author: {
            authorName: "Nii Odoi",
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

const server = new ApolloServer({
 blogSchema, 
 blogResolvers,
});



const server = new ApolloServer({
    typeDefs:schema,
    resolvers:blogResolvers,
    playground:true,
    introspection:true   
});
server.listen(PORT).then(({url}) =>{
    console.log(`Server ready at ${url}`);
}).catch(err => console.log(err.message));