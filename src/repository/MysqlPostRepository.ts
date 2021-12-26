import PostRepository from "../interface/PostRepository";
import Post from "../model/post";
export default class MysqlPostRepository implements PostRepository {
  create(post: Post): void {
    const query =
      "INSERT INTO twitter.post (customer_id,content) VALUES (?, ?)";
    global.connection.query(query, [post.customer_id, post.contetnt]);
  }
}
