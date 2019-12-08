const fetch = require('node-fetch');
const { SLACK_API_ENDPOINT } = require('./constants');

const sendMessage = (token, message) => {

    return fetch(SLACK_API_ENDPOINT, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(message),
    }).then(res => res.json())
    .then( data => {
        if(!data || !data.ok){
            throw data;
        }
        return data;
    })
    .catch(error => {
        throw new Error(JSON.stringify(error));
    });
};

  module.exports = sendMessage;