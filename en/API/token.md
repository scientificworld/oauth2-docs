# Get Access Token

After obtaining the authorization code, you need to request the following endpoint in the backend to exchange for an access token.

`POST https://api.koishi514.moe/oauth/token`

Parameters:

| Query parameter | Required? | Description |
| --------------- | --------- | ----------- |
| client\_id | Y | API Key obtained when registering the application |
| client\_secret | Y | Secret Key obtained when registering the application |
| code | Y | Authorization Code obtained in the previous step |
| redirect\_uri | Y | Need to be the same as the callback URL in the previous step |
| grant\_type | N | Defaults to "authorization\_code" |

If successful, a JSON-encoded response will be returned, containing the following fields:

| Field | Description |
| ----- | ----------- |
| access\_token | You can request for user information with this token |
| token\_type | Authorization type, the value is fixed to "Bearer" |
| expires\_in | Token validity time, in seconds |

If unsuccessful, a response similar to the following will be returned:

```
{
    "error": "invalid code."
}
```
