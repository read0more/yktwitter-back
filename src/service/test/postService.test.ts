import Customer from "../../model/customer";
import Post from "../../model/post";
import PostService from "../postService";
import PostRepositoryStub from "./postRepositoryStub";

describe("postService", () => {
  let postService: PostService;
  let customer: Customer;
  let postRepositoryStub: PostRepositoryStub;

  beforeEach(() => {
    postRepositoryStub = new PostRepositoryStub();
    jest.spyOn(postRepositoryStub, "create");
    postService = new PostService(postRepositoryStub);
    const id = "ykpark";
    const password = "password";
    const name = "name";
    const email = "ykpark@test.com";
    const profilePictureURL = "https://google.com";
    customer = new Customer(id, password, name, email, profilePictureURL);
  });

  it("create post", () => {
    const post = new Post(1, "트윗1");
    postService.create(post);
    expect(postRepositoryStub.create).toHaveBeenCalledWith(post);
  });
});
