# 获取访问令牌

在获取到授权码以后，需要在后端请求以下终结点以换取访问令牌。

`POST https://api.koishi514.moe/oauth/token`

参数说明：

| 参数名 | 是否必须 | 描述 |
| ------ | -------- | ---- |
| client\_id | 是 | 注册应用时获得的 API Key |
| client\_secret | 是 | 注册应用时获得的 Secret Key |
| code | 是 | 上一步获得的授权码 |
| redirect\_uri | 是 | 需要和获取授权码时使用的回调地址一致 |
| grant\_type | 否 | 默认为 authorization\_code，非 authorization\_code 的值将会报错 |

如果成功，将会返回 JSON 格式的响应，包含如下字段：

| 字段名 | 描述 |
| ------ | ---- |
| access\_token | 访问令牌，可通过此令牌请求用户信息 |
| token\_type | 令牌类型，值固定为 Bearer |
| expires\_in | 令牌有效时间，单位为秒 |

如果失败，则会返回类似以下形式的响应：

```json
{
    "error": "invalid code."
}
```
