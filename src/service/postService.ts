import PostRepository from "../interface/PostRepository";
import Post from "../model/Post";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  create(post: Post) {
    return this.postRepository.create(post);
  }

  readAll() {
    return this.postRepository.readAll();
  }

  update(post: Post) {
    return this.postRepository.update(post);
  }

  delete(id: number) {
    return this.postRepository.delete(id);
  }
}
