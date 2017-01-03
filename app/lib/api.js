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
    const url =`https://salty-cove-91712.herokuapp.com`+`${route}`
    console.log(url)
    let options = Object.assign({ method: verb }, params ? { body: params } : null );
    options.headers = Api.headers()
    return fetch(url, options)
    .then((resp) => {
      if(resp.ok)
        return resp.json()
      else
        console.log('error')
    }).then((resp) => {
      return resp
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
export default Api
