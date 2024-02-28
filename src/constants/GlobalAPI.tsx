export const CURRENT_STATE = "TESTING"; //change to PRODUCTION before release

export const API = {
  TESTING: "http://16.170.206.59/", //EC2: 'http://65.2.73.114:8000/api/   local: http://10.0.2.2:8000/api/ '
  PRODUCTION: "http://16.170.206.59/",
  USER: {
    login: "auth/login",
    profile: "profile",
    post: "post/suggested",
    like: "like",
    documentUpload: "user/document/extUpload",
  },
  POST: {
    comments: "post/comment/",
    replysOnComment: "post/reply/",
    reply: "post/reply/",
    like: "like/",
    newPost: "post",
  },
};
