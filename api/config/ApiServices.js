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

module.exports =  {
  GetApiCall
};
