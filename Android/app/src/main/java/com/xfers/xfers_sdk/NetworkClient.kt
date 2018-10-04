package com.xfers.xfers_sdk

import java.io.InputStream
import okhttp3.OkHttpClient
import okhttp3.Request

class NetworkClient {

    fun get(url: String): InputStream? {
        val request = Request.Builder().url(url).build()
        val response = OkHttpClient().newCall(request).execute()
        val body = response.body()

        return body?.byteStream()
    }

    // TODO: POST PUT DELETE
}
