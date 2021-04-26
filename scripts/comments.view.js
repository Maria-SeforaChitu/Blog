class CommentsView {
  outputSelector = "#comments";
  listTemplate = document.querySelector('[data-template="comments"]');
  addCommentForm = document.querySelector("[data-form]");

  constructor(handlers) {
    if (handlers.submitHandler) {
      this.addCommentForm.addEventListener("submit", handlers.submitHandler);
    }
  }

  getTemplate() {
    const clone = this.listTemplate.content.cloneNode(true);

    return clone;
  }

  createCommentsList(comments) {
    const commentsList = document.createDocumentFragment();

    for (const comment of comments) {
      const template = this.getTemplate();

      const author = template.querySelector("strong"); //author
      const date = template.querySelector("em"); //date
      const content = template.querySelector("span"); //content

      author.innerText = comment.author;
      date.innerText = comment.date;
      content.innerText = comment.content;

      commentsList.appendChild(template);
    }

    return commentsList;
  }

  display(what) {
    document.querySelector(this.outputSelector).appendChild(what);
  }

  renderCommentsList(comments) {
    const html = this.createCommentsList(comments);
    this.display(html);
  }

  getNewCommentData() {
    const inputs = this.addCommentForm.elements;
    const content = inputs.content.value;
    const author = inputs.author.value;
    const date = inputs.date.valueAsDate;

    return { content, author, date };
  }

  resetForm() {
    this.addCommentForm.reset();
  }
}
