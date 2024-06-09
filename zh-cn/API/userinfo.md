# 获取用户信息

在获取到访问令牌以后，可以请求以下终结点以获取用户信息。

`GET https://api.koishi514.moe/oauth/userinfo`

需要将 `access_token` 放在 Authorization 标头中传递，授权类型为 Bearer。

如果成功，将会返回 JSON 格式的响应，可能包含如下字段，取决于第一步的 `scope` 参数：

| 字段名 | 描述 |
| ------ | ---- |
| openid | JWT 格式的令牌，可以用来标识用户身份 |
| profile | 用户个人主页的 URL |
| email | 用户的电子邮箱地址 |
| avatar | 用户头像的 URL |
| nickname | 用户的昵称 |

openid 令牌内包含如下字段：

| 字段名 | 描述 |
| ------ | ---- |
| iat | 令牌的签发时间 |
| exp | 令牌的过期时间，和 access\_token 一致 |
| user | 用户名 |
| cid | 应用的 API Key |

该令牌使用 ES256 算法进行签名，你可以用以下的公钥来验证它：

```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEMnNN7RtsyHk3QMNbC2Ot765nOY7J
E5eOLz7n5KrBnbilu7y8mH8nLVF/arNnUoboRL/qbuGnR/zSDpI14BuRGw==
-----END PUBLIC KEY-----
```
