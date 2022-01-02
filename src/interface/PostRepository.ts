import Post from "../model/Post";

export default interface CustomerRepository {
  create(post: Post): Promise<Post>;
  readAll(): Promise<Post[]>;
  update(post: Post): Promise<Post>;
}
