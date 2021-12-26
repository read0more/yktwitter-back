import Post from "../model/post";

export default interface CustomerRepository {
  create(post: Post): void;
  readAll(): Promise<any>;
}
