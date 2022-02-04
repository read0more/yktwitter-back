export default class Post {
  constructor(
    public customerEntityId: number | null,
    public content: string,
    public entityId: number | null = null,
    public createdAt: Date | null = null,
    public customerId: string | null = null,
    public customerName: string | null = null,
    public customerProfilePictureUrl: string | null = null
  ) {}

  toSnakeCase() {
    return {
      customer_entity_id: this.customerEntityId,
      content: this.content,
      entity_id: this.entityId,
      created_at: this.createdAt,
      customer_id: this.customerId,
      customer_name: this.customerName,
      customer_profile_picture_url: this.customerProfilePictureUrl,
    };
  }
}
