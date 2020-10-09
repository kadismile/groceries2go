import {client, localStorageKey} from './api-client'
import * as url from "../utils/constants";
import {queryCache} from "react-query";
import toastr from "toastr";

async function handleUserResponse(data) {
  window.localStorage.setItem(localStorageKey, data.token);
  const user = await getUser();
  if (user) {
    return [user]
  }
}

function login({email, password}) {
  return client(url.LOGIN_URL, {data: {email, password}}).then(handleUserResponse)
}

function register({username, password}) {
  return client('register', {data: {username, password}}).then(
    handleUserResponse,
  )
}

function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/users/get`, {data: {token}}).then(data => {
    console.log("GET_USER ", data)
    if (data.status === "success") {
      return data.user
    } else {
      toastr.error(data.error);
      window.localStorage.clear();
      return null
    }
  })
}

function getCategory() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/users/category`).then(data => data)
}

function getAllUsers() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/users/all-users`).then(data => data)
}

function createCategory(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/users/category`, {data}).then(data => data)
}

function registerUser(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/auth/user/register`, {data}).then(data => data)
}

function getToken() {
  let token = window.localStorage.getItem(localStorageKey);
  if (token) {
    return token
  }
  return null
}


function isLoggedIn() {
  return Boolean(getToken())
}

function logout() {
  queryCache.clear();
  window.localStorage.removeItem(localStorageKey);
}


export {login, register, getToken, isLoggedIn, getUser, getCategory, createCategory,registerUser, getAllUsers}
export {logout} from './api-client'
