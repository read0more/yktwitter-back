export default class Post {
  constructor(
    public customer_id: number,
    public contetnt: string,
    public createdAt: Date | null = null
  ) {}
}
