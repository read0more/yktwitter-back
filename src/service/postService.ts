import PostRepository from "../interface/PostRepository";
import Post from "../model/post";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  create(post: Post) {
    this.postRepository.create(post);
  }
}