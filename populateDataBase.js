const fetch = require('node-fetch');
const userSchema = require('./database/models/userModel')
const adminSchema = require('./database/models/adminModel')
const dbConnection = require('./database/connection')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const fill_all_details = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then( json => {return json.json()});
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then( json => {return json.json()});
    const comments = await fetch('https://jsonplaceholder.typicode.com/comments').then( json => {return json.json()});


    dbConnection();
    all_documents = [];
    console.log('Started');
    for (user of users) {
        user_document = {...user};
        user_document['posts'] = [];
        for (post of posts) {
            if (user_document.id == post.userId){
                post['comments'] = [];
                user_document['posts'].push({...post});
                for (comment of comments) {
                    if (post.id == comment.postId){
                        user_document['posts'][user_document['posts'].length-1]['comments'].push({...comment});
                    }
                }
            }
        }
        all_documents.push(user_document);
    }

    for (document of all_documents) {
        document._id = document.id;
        delete document.id;
        console.log('Default user password', process.env.DEFAULT_USER_PASSWORD);
        const password = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD, 12);
        const newUser = new userSchema({...document, password: password });
        try {
            let result = await newUser.save();
            // console.log(result);
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log(process.env.ADMIN_PASSWORD);
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    email = 'admin@api.com';
    const newAdmin = new adminSchema({email: email, password: password});
    try {
        let result = await newAdmin.save();
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }

    console.log('finished_inserting to database');
    mongoose.connection.close();
}

fill_all_details();
