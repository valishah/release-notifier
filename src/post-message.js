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
        console.log('====== RESPONSE =======');
        console.log(data);
        if(!data || !data.result || !data.result.ok){
            throw `Error! ${JSON.stringify(data)}`;
        }
        return data;
    })
    .catch(error => {
        console.log('====== ERROR =======');
        console.log(error);
        throw `Error! ${JSON.stringify(response)}`;
    });
};

  module.exports = sendMessage;