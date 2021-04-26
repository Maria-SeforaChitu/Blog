class PostDetailsController {
  static apiUrl = "http://localhost:3000";
  static id = PostDetailsController.getUrlParam("id");

  postsModel = new PostsModel(PostDetailsController.apiUrl);
  postsView = new PostsView({ deleteHandler: this.deletePost.bind(this) });
  commentsModel = new CommentsModel(
    PostDetailsController.apiUrl,
    PostDetailsController.id
  );
  commentsView = new CommentsView({
    submitHandler: this.createNewComment.bind(this),
  });

  async renderPostDetails() {
    const post = await this.postsModel.getById(PostDetailsController.id);
    this.postsView.renderPostDetails(post);
    this.commentsModel
      .getAllComments()
      .then((comments) => this.commentsView.renderCommentsList(comments));
  }

  async deletePost(e) {
    e.preventDefault();
    // sa stergem de pe server
    await this.postsModel.delete(PostDetailsController.id);

    // sa navigam inapoi la lista
    location = "index.html";
  }

  async createNewComment(e) {
    e.preventDefault();
    const comment = this.commentsView.getNewCommentData();

    const newComment = await this.commentsModel.create(comment);
    this.commentsView.renderCommentsList([newComment]);
    this.commentsView.resetForm();
  }

  static getUrlParam(name) {
    //"?altceva=ceva&movieId=6018075fa1c19b0022112a01&test=8"
    const search = location.search.substr(1); // substr scoate semnul intrebarii din query string

    //"altceva=ceva&movieId=6018075fa1c19b0022112a01&test=8""
    const keyValuePairs = search.split("&");

    // array de stringuri cheie=valoare
    for (const pair of keyValuePairs) {
      // Array destructuring
      const [key, value] = pair.split("=");

      if (key === name) {
        return value;
      }
    }

    console.warn(
      'The query parameter you tried to get: "%s" is not available in the URL.',
      name
    );
    return undefined;
  }
}

const controller = new PostDetailsController();
controller.renderPostDetails();
