const EleventyFetch = require("@11ty/eleventy-fetch");
const util = require("util");
require("dotenv").config();

// THIS SHOULD BE A NETLIFY SERVERLESS FUNCTION

module.exports = async function () {

  const NETLIFY_AUTH_TOKEN = `${process.env.NETLIFY_TOKEN}`;
  const WRENCH_FORM_ID = "6518b273774a8100083a4c9a";

  const url = `https://api.netlify.com/api/v1/forms/${WRENCH_FORM_ID}/submissions`;

  const res = EleventyFetch(url, {
    duration: "1h",
    type: "json",
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${NETLIFY_AUTH_TOKEN}`,
      },
    },
  }).catch();
  const data = await res

  const massagedResponses = data
    .map((response) => {
      return {
        date: response.created_at,
        author: response.data['name'],
        id: response.id,
        post_id: response.number,
        message: response.data.message
      };
    })
  console.log(massagedResponses);
  return massagedResponses;
}
