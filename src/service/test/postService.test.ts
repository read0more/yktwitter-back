import Customer from "../../model/customer";
import Post from "../../model/post";
import PostService from "../postService";
import PostRepositoryStub from "./postRepositoryStub";

describe("postService", () => {
  let postService: PostService;
  let customer: Customer;
  let postRepositoryStub: PostRepositoryStub;
  const postData = [
    new Post(1, "트윗1", new Date("2021-12-26 10:10:09")),
    new Post(2, "트윗2", new Date("2021-12-26 10:10:09")),
  ];

  beforeEach(() => {
    postRepositoryStub = new PostRepositoryStub(postData);
    jest.spyOn(postRepositoryStub, "create");
    postService = new PostService(postRepositoryStub);
    const id = "ykpark";
    const password = "password";
    const name = "name";
    const email = "ykpark@test.com";
    const profilePictureURL = "https://google.com";
    customer = new Customer(id, password, name, email, profilePictureURL);
  });

  it("create post", async () => {
    const post = new Post(1, "트윗1");
    const createdPost = await postService.create(post);
    expect(createdPost).toEqual(post);
  });

  it("read all post", async () => {
    const result = await postService.readAll();
    expect(result).toEqual(postData);
  });

  it("update post", async () => {
    const post = new Post(1, "변경된 트윗");
    const updatedPost = await postService.update(post);
    expect(updatedPost).toEqual(post);
  });
});
