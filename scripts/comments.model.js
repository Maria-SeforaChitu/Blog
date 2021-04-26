class CommentsModel {
  endpoint = "/comments";

  constructor(apiUrl, postId) {
    this.apiUrl = apiUrl;
    this.postId = postId;
  }

  get url() {
    return this.apiUrl + "/posts/" + this.postId + this.endpoint;
  }

  getAllComments() {
    return fetch(this.url).then(this.handleResponse);
  }

  create(comment) {
    comment.postId = this.postId;

    const month = this.prefixZero(comment.date.getMonth() + 1);
    const day = this.prefixZero(comment.date.getDate());

    comment.date = `${comment.date.getFullYear()}-${month}-${day}`;

    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(comment),
    }).then(this.handleResponse);
  }

  prefixZero(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error(
      "Something went wrong with our request to the server. Context is postId = " +
        this.postId
    );
  }
}
