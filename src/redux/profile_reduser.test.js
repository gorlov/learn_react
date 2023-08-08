import profileReducer, { addPostActionCreator } from "./profile_reducer"


it ("new post shoud be added", () => {
    let action = addPostActionCreator("new post");

    let state = {
        posts: [
            { id: 1, likesCount: 5, post: 'Do ex reprehenderit elit labore. Irure nisi qui dolore cupidatat incididunt nostrud culpa velit dolore anim Lorem officia. Do velit nulla mollit occaecat qui. Reprehenderit irure adipisicing non duis laboris tempor et sint irure eiusmod. Enim sunt et ullamco non in Lorem tempor cillum.' },
            { id: 2, likesCount: 13, post: 'Nulla ipsum voluptate ad laboris anim duis labore exercitation quis officia aute esse. Aliquip ipsum commodo proident non et culpa ea excepteur dolore irure tempor. Eu deserunt consectetur elit eiusmod excepteur voluptate cillum anim elit sint. Minim aute irure in duis nostrud do veniam reprehenderit veniam. Non consequat excepteur ex veniam. Qui velit minim irure elit voluptate consectetur adipisicing deserunt duis enim cupidatat est consectetur.' },
            { id: 3, likesCount: 7, post: 'Eiusmod quis magna Lorem elit ex sunt anim mollit laboris est cupidatat sunt ad mollit. Laboris minim adipisicing velit incididunt cillum eiusmod sint elit fugiat esse sit amet. Velit ipsum est dolor sit consectetur in mollit.' }
        ],
    }

    let newstate = profileReducer(state, action);

    expect(newstate.posts.length).toBe(4);
})