import Post from "../model/Post";

export default interface CustomerRepository {
  create(post: Post): void;
  readAll(): Promise<any>;
}
