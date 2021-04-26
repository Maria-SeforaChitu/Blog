// function PostsModel(apiUrl) {
//   this.apiUrl = apiUrl;
//   this.endpoint = '/posts';
// }

// PostsModel.prototype.create = function (post) {
//   return fetch(this.apiUrl + this.endpoint, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(post),
//   }).then((res) => res.json());
// };

// const model = new PostsModel('http://localhost:3000');

class PostsModel {
  endpoint = '/posts';

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  get url() {
    return this.apiUrl + this.endpoint;
  }

  //CRUD

  //Create
  create(post) {
    const month = this.prefixZero(post.date.getMonth() + 1);
    const day = this.prefixZero(post.date.getDate());

    post.date = `${post.date.getFullYear()}-${month}-${day}`;

    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post),
    }).then(this.handleResponse);
  }

  //Read/Retrieve
  // /posts - o lista de post-uri
  // /posts/1 - Un singur post

  getAll() {
    return fetch(this.url).then(this.handleResponse);
  }

  getById(id) {
    return fetch(`${this.url}/${id}`).then(this.handleResponse);
  }

  //Update
  update(id, post) {
    return fetch(`${this.url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post),
    }).then(this.handleResponse);
  }

  //Delete
  delete(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    }).then(this.handleResponse);
  }

  prefixZero(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  handleResponse(res) {
    if (!res.ok) {
      throw new Error('Something went wrong with our request to the server.');
    }

    return res.json();
  }
}
