export default class Post {
  constructor(
    public customerId: number | null,
    public content: string,
    public entityId: number | null = null,
    public createdAt: Date | null = null
  ) {}
}
