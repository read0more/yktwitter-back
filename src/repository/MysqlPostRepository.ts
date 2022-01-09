import { OkPacket } from "mysql";
import PostRepository from "../interface/PostRepository";
import Post from "../model/Post";
export default class MysqlPostRepository implements PostRepository {
  create(post: Post): Promise<Post> {
    const query = "INSERT INTO post (customer_id,content) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
      global.connection.query(
        query,
        [post.customerId, post.content],
        (error, results: OkPacket) => {
          if (error) {
            reject(error);
          }

          post.entityId = results.insertId;
          resolve(post);
        }
      );
    });
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
                post.entity_id,
                new Date(post.created_at)
              )
          )
        );
      });
    });
  }

  update(post: Post): Promise<Post> {
    const query = "UPDATE post SET content = ? WHERE entity_id = ?;";
    return new Promise((resolve, reject) => {
      global.connection.query(query, [post.content, post.entityId], (error) => {
        if (error) {
          reject(error);
        }

        resolve(post);
      });
    });
  }

  delete(id: number): Promise<boolean> {
    const query = "DELETE FROM post WHERE entity_id = ?;";
    return new Promise((resolve, reject) => {
      global.connection.query(query, [id], (error, results: OkPacket) => {
        if (error || !results.affectedRows) {
          reject(false);
        }

        resolve(true);
      });
    });
  }
}
