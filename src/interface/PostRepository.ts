import Post from "../model/Post";

export default interface CustomerRepository {
  create(post: Post): Promise<void>;
  readAll(): Promise<Post[]>;
  update(post: Post): Promise<void>;
  delete(id: number): Promise<void>;
}
