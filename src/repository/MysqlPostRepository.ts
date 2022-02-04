import { OkPacket } from "mysql";
import PostRepository from "../interface/PostRepository";
import Post from "../model/Post";
export default class MysqlPostRepository implements PostRepository {
  selectQuery =
    "SELECT p.entity_id, content, created_at, c.entity_id as customer_entity_id, id as customer_id, name as customer_name, profile_picture_url as customer_profile_picture_url FROM post as p, customer as c WHERE p.customer_id = c.entity_id";
  create(post: Post): Promise<Post> {
    const query = "INSERT INTO post (customer_id,content) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
      global.connection.query(
        query,
        [post.customerEntityId, post.content],
        (error, results: OkPacket) => {
          if (error) {
            reject(error);
          }

          global.connection.query(this.selectQuery, (error, results) => {
            resolve(
              results.map((row: any) =>
                new Post(
                  row.customer_entity_id,
                  row.content,
                  row.entity_id,
                  new Date(row.created_at),
                  row.customer_id,
                  row.customer_name,
                  row.customer_profile_picture_url
                ).toSnakeCase()
              )
            );
          });
        }
      );
    });
  }

  readAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      global.connection.query(this.selectQuery, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(
          results.map((row: any) =>
            new Post(
              row.customer_entity_id,
              row.content,
              row.entity_id,
              new Date(row.created_at),
              row.customer_id,
              row.customer_name,
              row.customer_profile_picture_url
            ).toSnakeCase()
          )
        );
      });
    });
  }

  update(post: Post): Promise<Post> {
    const query = "UPDATE post SET content = ? WHERE entity_id = ?;";
    return new Promise((resolve, reject) => {
      global.connection.query(
        query,
        [post.content, post.entityId],
        (error, results) => {
          if (error) {
            reject(error);
          }

          global.connection.query(this.selectQuery, (error, results) => {
            resolve(
              results.map((row: any) =>
                new Post(
                  row.customer_entity_id,
                  row.content,
                  row.entity_id,
                  new Date(row.created_at),
                  row.customer_id,
                  row.customer_name,
                  row.customer_profile_picture_url
                ).toSnakeCase()
              )
            );
          });
        }
      );
    });
  }

  delete(id: number): Promise<boolean> {
    const query = "DELETE FROM post WHERE entity_id = ?;";
    return new Promise((resolve, reject) => {
      global.connection.query(query, [id], (error, results: OkPacket) => {
        if (error || !results.affectedRows) {
          reject(false);
        }

        global.connection.query(this.selectQuery, (error, results) => {
          resolve(
            results.map((row: any) =>
              new Post(
                row.customer_entity_id,
                row.content,
                row.entity_id,
                new Date(row.created_at),
                row.customer_id,
                row.customer_name,
                row.customer_profile_picture_url
              ).toSnakeCase()
            )
          );
        });
      });
    });
  }
}
