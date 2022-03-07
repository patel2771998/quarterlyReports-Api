const fetch = require('node-fetch');

const GetApiCall = async (
  url,
  header,
  showNoInternetMessage = true,
  manageApiResponse = true,
) => {
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: header,
  })
    .then((r) => r.json())
    .catch((exc) => {
      console.log(exc);
      return null;
    });

  if (!manageApiResponse) {
    return null;
  } else if (rawResponse === null) {
    return null;
  } else if (rawResponse.status_code === undefined) {
    return rawResponse;
  } else if (
    rawResponse.status_code === 200 ||
    rawResponse.status_code === 101
  ) {
    return rawResponse;
  } else {
    return null;
  }
};

const PostApiCall = async (
  url,
  payLoad,
  header,
  showNoInternetMessage = true,
  manageApiResponse = true,
) => {  
  if (!!payLoad && Object.keys(payLoad).length > 0) {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: header,
      body: payLoad,
    })
      .then((r) => {
        return r.json();
      })
      .catch((exc) => {
        console.log(exc);
        return null;
      });
    if (!manageApiResponse) {
      return null;
    } else if (rawResponse === null) {
      return null;
    } else if (rawResponse.status_code === undefined) {
      return rawResponse;
    } else if (
      rawResponse.status_code === 200 ||
      rawResponse.status_code === 101
    ) {
      return rawResponse;
    } else {
      return null;
    }
  } else {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: header,
    })
      .then((r) => r.json())
      .catch((exc) => {
        console.log(exc);
        return null;
      });

    if (!manageApiResponse) {
      return null;
    } else if (rawResponse === null) {
      return null;
    } else if (rawResponse.status_code === undefined) {
      return rawResponse;
    } else if (
      rawResponse.status_code === 200 ||
      rawResponse.status_code === 101
    ) {
      return rawResponse;
    } else {
      return null;
    }
  }
};


const DeleteApiCall = async (
  url,
  header,
  showNoInternetMessage = true,
  manageApiResponse = true,
) => {
  const rawResponse = await fetch(url, {
    method: 'DELETE',
    headers: header,
  })
    .then((r) => r.json())
    .catch((exc) => {
      console.log(exc);
      return null;
    });

  if (!manageApiResponse) {
    return null;
  } else if (rawResponse === null) {
    return null;
  } else if (rawResponse.status_code === undefined) {
    return rawResponse;
  } else if (
    rawResponse.status_code === 200 ||
    rawResponse.status_code === 101
  ) {
    return rawResponse;
  } else {
    return null;
  }
};
module.exports =  {
  GetApiCall,
  PostApiCall,
  DeleteApiCall
};
