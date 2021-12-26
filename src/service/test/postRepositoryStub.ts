import PostRepository from "../../interface/PostRepository";
import Customer from "../../model/customer";
import Post from "../../model/post";

const postData: {
  [key: string]: Post;
} = {
  ykpark: new Post(1, "트윗1"),
  ykpark2: new Post(2, "트윗2"),
};
export default class customerRepositoryStub implements PostRepository {
  create(post: Post): void {}
}
