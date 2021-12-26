import PostRepository from "../../interface/PostRepository";
import Customer from "../../model/customer";
import Post from "../../model/post";
export default class customerRepositoryStub implements PostRepository {
  constructor(public postData: Post[]) {}
  create(post: Post): void {}
  readAll(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.postData);
    });
  }
}
