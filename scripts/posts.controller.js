class PostsController {
  static apiUrl = "http://localhost:3000";

  model = new PostsModel(PostsController.apiUrl);
  view = new PostsView({ submitHandler: this.createNewPost.bind(this) });

  renderPostsList() {
    this.model.getAll().then((posts) => this.view.renderPostsList(posts));
  }

  async createNewPost(e) {
    e.preventDefault();
    const post = this.view.getNewPostData();

    const newPost = await this.model.create(post);
    this.view.renderPostsList([newPost]);
    this.view.resetForm();
  }
}

const controller = new PostsController();
controller.renderPostsList();
