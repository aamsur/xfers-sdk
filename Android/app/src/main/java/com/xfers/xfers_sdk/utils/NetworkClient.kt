package com.xfers.xfers_sdk.utils

import java.io.InputStream
import okhttp3.OkHttpClient
import okhttp3.Request

class NetworkClient {

    private val userApiKeyHeader = "X-XFERS-USER-API-KEY"
    private val merchantApiKeyHeader = "X-XFERS-APP-API-KEY"

    fun get(url: String, apiKey: String? = null, userApiKey: String? = null): InputStream? {
        val requestBuilder = Request.Builder().url(url)

        apiKey?.let {
            requestBuilder.header(merchantApiKeyHeader, it)
        }

        userApiKey?.let {
            requestBuilder.header(userApiKeyHeader, it)
        }

        val request = requestBuilder.build()

        val response = OkHttpClient().newCall(request).execute()
        val body = response.body()

        return body?.byteStream()
    }
}
