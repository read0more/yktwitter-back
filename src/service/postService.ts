import PostRepository from "../interface/PostRepository";
import Post from "../model/Post";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  create(post: Post) {
    this.postRepository.create(post);
  }

  readAll() {
    return this.postRepository.readAll();
  }
}
