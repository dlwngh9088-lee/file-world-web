'use strict';

/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Array || Object} params
 * @returns
 */
async function reqAjax(url, method, params) {
  const screen = document.querySelector('.screen');
  const bearerToken = `bearer ${localStorage.getItem('token')}`;

  // token send
  const config = {
    headers: {
      Authorization: bearerToken,
    },
  };

  let getReqResults = {};

  try {
    screen.style.display = 'block';

    if (method === 'post' || method === 'put') {
      getReqResults = await axios[method](url, params, config);
    } else {
      getReqResults = await axios[method](url);
    }

    return getReqResults.data;
  } catch (err) {
    if (err.response.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/';
      return notification('danger', 'LOG OUT', 'Logged out.');
    } else if (err.response.status === 500) {
      return notification(
        'danger',
        'SERVER ERROR',
        'We are sorry for the disruption to the service.',
      );
    }

    return err.response.data;
  } finally {
    screen.style.display = 'none';
  }
}
