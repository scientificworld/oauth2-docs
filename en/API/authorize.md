# Get Authorization Code

The application should redirect the user to the following endpoint.

`GET https://api.koishi514.moe/oauth/authorize`

Parameters:

| Query parameter | Required? | Description |
| --------------- | --------- | ----------- |
| client\_id | Y | API Key obtained when registering the application |
| response\_type | N | Defaults to "code" |
| redirect\_uri | N | One of the following conditions must be met: this parameter, except for query and fragment parts, is consistent with the callback URL provided at registration; the hostname is a loopback address; no callback URL was provided at registration (in this case, this parameter must be provided) |
| scope | N | A space-delimited list of scopes. Defaults to all available scopes if not provided. |
| state | N | An unguessable string to prevent CSRF attack. Will be passed to callback URL. |

After the user successfully logged in, the page will be redirected to the callback URL with `code` and `state` parameters.

The authorization code is valid for 60 seconds. It's in JWT format, but the format is not guaranteed, please don't try to parse the contents.

If the user cancels the login, the page will be redirected to the callback URL with `error` (value fixed to "cancelled") and `state` parameters.
