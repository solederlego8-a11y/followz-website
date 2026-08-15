const CLIENT_ID = process.env.OAUTH_CLIENT_ID;

exports.handler = async function (event) {
  const siteUrl = `https://${event.headers.host}`;
  const redirectUri = `${siteUrl}/.netlify/functions/callback`;
  const authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return {
    statusCode: 302,
    headers: { Location: authorizeUrl },
    body: "",
  };
};
