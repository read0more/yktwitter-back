export default class Post {
  constructor(
    public customerId: number | null,
    public contetnt: string,
    public entityId: number | null = null,
    public createdAt: Date | null = null
  ) {}
}
