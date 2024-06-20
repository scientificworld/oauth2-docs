# Get User Information

After obtaining the access token, you can request the following endpoint to obtain user information.

`GET https://api.koishi514.moe/oauth/userinfo`

The `access_token` needs to be passed in the Authorization header, and the authorization type is Bearer.

If successful, a JSON-encoded response will be returned, which may contain the following fields, depending on the `scope` parameter in the first step. 

| Field | Description |
| ----- | ----------- |
| openid | JWT-formatted token that can be used to identify a user |
| profile | The URL of the user's homepage |
| email | The E-mail address of the user |
| avatar | The URL of the user's avatar |
| nickname | The nickname of the user |
| register\_at | The UNIX timestamp of user registration time |

The openid token contains the following fields:

| Field | Description |
| ----- | ----------- |
| iat | Time at which the JWT was issued |
| exp | Time after which the JWT expires, consistent with access\_token |
| user | Username |
| cid | The API Key of the application |

This token is signed using the ES256 algorithm, you can verify it with the following public key:

```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEMnNN7RtsyHk3QMNbC2Ot765nOY7J
E5eOLz7n5KrBnbilu7y8mH8nLVF/arNnUoboRL/qbuGnR/zSDpI14BuRGw==
-----END PUBLIC KEY-----
```
