import PostRepository from "../interface/PostRepository";
import Post from "../model/post";
export default class MysqlPostRepository implements PostRepository {
  create(post: Post): void {
    const query = "INSERT INTO post (customer_id,content) VALUES (?, ?)";
    global.connection.query(query, [post.customer_id, post.contetnt]);
  }

  readAll(): Promise<any> {
    const query = "SELECT * FROM post";
    return new Promise((resolve, reject) => {
      global.connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(
          results.map(
            (post: any) =>
              new Post(
                post.customer_id,
                post.content,
                new Date(post.created_at)
              )
          )
        );
      });
    });
  }
}
