import PostRepository from "../../interface/PostRepository";
import Post from "../../model/Post";
export default class customerRepositoryStub implements PostRepository {
  constructor(public postData: Post[]) {}
  create(post: Post): Promise<Post> {
    return new Promise((resolve) => {
      resolve(post);
    });
  }

  readAll(): Promise<Post[]> {
    return new Promise((resolve) => {
      resolve(this.postData);
    });
  }

  update(post: Post): Promise<Post> {
    return new Promise((resolve) => {
      resolve(post);
    });
  }

  delete(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(!!this.postData[id]);
    });
  }
}
