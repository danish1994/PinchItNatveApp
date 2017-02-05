'use-strict'

class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'dataType': 'json',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const url =`http://pinched.in`+`${route}`
    console.log(url)
    let options = Object.assign({ method: verb }, params ? { body: params } : null );
    options.headers = Api.headers()
    return fetch(url, options)
    .then((resp) => {
      if(resp.ok)
        return resp.json()
      else
        console.log(resp)
    }).then((resp) => {
      return resp
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
export default Api
