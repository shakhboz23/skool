import axios from "axios";
import {useLoadingStore} from "@/store"
export const useApiRequest = () => {
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();
  const { start, finish } = useLoadingIndicator();
  const endPoint = isLoading.store.baseUrl;
  const token = null;

  function getToken() {
    return localStorage.getItem("token");
  }

  function getHeader() {
    let token = getToken();

    return {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    };
  }

  function get(url) {
    if (process.client) {
      let headers = getHeader();
      url = endPoint + url;
      return new Promise(function (resolve, reject) {
        axios
          .get(url, { headers })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            if (err.response?.status == 401) {
              isLoading.store.isLogin = false;
              // localStorage.removeItem("token");
            }
            // isLoading.store.loadingTypes = [];
            resolve(err);
          });
      });
    }
  }

  function post(url, data = {}) {
    let headers = this.getHeader();
    url = this.endPoint + this.filterUrl(url);
    return new Promise(function (resolve, reject) {
      axios
        .post(url, data, { headers })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          if (err) {
            console.log(err);
          }
        });
    });
  }

  function put(url, data = {}) {
    let headers = this.getHeader();
    url = this.endPoint + this.filterUrl(url);
    return new Promise(function (resolve, reject) {
      axios
        .put(url, data, { headers: headers })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function delete_req(url) {
    let headers = this.getHeader();
    url = this.endPoint + this.filterUrl(url);
    return new Promise(function (resolve, reject) {
      axios
        .delete(url, { headers: headers })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return {
    get,
    post,
    put,
    delete_req,
  };
};
