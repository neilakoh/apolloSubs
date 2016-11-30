import { Author, FortuneCookie, View } from './connectors';

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    getFortuneCookie() {
      return FortuneCookie.getOne();
    },
    authors() {
      return Author.findAll({});
    },
  },
  Author: {
    posts(author) {
      return author.getPosts();
    },
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return View.findOne({ postId: post.id }).then((views) => views.views);
    },
  },
};

export default resolvers;
