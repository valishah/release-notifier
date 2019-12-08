const { SLACK_API_ENDPOINT } = require('./constants');

const post = (token, message) => {
    return new Promise((resolve, reject) => {
        fetch(SLACK_API_ENDPOINT, {
            method: 'POST', 
            headers: new Headers({
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${token}`
            }),
            body: JSON.stringify(message),
        }).then(res => res.json())
        .then( data => resolve(data))
        .catch(error => reject(err));
    });
};
  
const sendMessage = async (token, message) => {
    const response = await post(token, message);
    const result = JSON.parse(response.result);

    if (!result || !result.ok || response.statusCode !== 200) {
        throw `Error! ${JSON.stringify(response)}`;
    }
    return response;
};

  module.exports = sendMessage;