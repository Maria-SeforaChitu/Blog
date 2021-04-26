class PostsView {
  outputSelector = "#posts";
  listTemplate = document.querySelector('[data-template="posts"]');
  addPostForm = document.querySelector("[data-form]");

  constructor(handlers) {
    if (handlers.submitHandler) {
      this.addPostForm.addEventListener("submit", handlers.submitHandler);
    }

    if (handlers.deleteHandler) {
      document.body
        .querySelector("button")
        .addEventListener("click", handlers.deleteHandler);
    }
  }

  // luam template-ul
  //      querySelector
  // clonam template-ul
  //      template.content.cloneNode()
  // populam toate elementele din template cu datele corecte
  //      clone.innerText sau similare
  // punem template-ul in output
  //      qS.appendChild(clone);
  getTemplate() {
    const clone = this.listTemplate.content.cloneNode(true);

    return clone;
  }

  createPostsList(posts) {
    const postsList = document.createDocumentFragment();

    for (const post of posts) {
      const template = this.getTemplate();

      const link = template.querySelector("a"); //titlul, href
      const date = template.querySelector("span"); //date
      const author = template.querySelector("em"); //author

      link.innerText = post.title;
      link.href = "postDetails.html?id=" + post.id;

      date.innerText = post.date;

      author.innerText = post.author;

      postsList.appendChild(template);
    }

    return postsList;
  }

  display(what) {
    document.querySelector(this.outputSelector).appendChild(what);
  }

  renderPostsList(posts) {
    const html = this.createPostsList(posts);
    this.display(html);
  }

  getNewPostData() {
    const inputs = this.addPostForm.elements;
    const title = inputs.title.value;
    const body = inputs.body.value;
    const date = inputs.date.valueAsDate;
    const author = inputs.author.value;

    return { title, body, author, date };
  }

  resetForm() {
    this.addPostForm.reset();
  }

  renderPostDetails(post) {
    document.body.querySelector("h1").innerText = post.title;
    document.body.querySelector("strong").innerText = post.author;
    document.body.querySelector("em").innerText = post.date;
    document.body.querySelector("p").innerText = post.body;
  }
}
