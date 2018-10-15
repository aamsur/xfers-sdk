package com.xfers.xfers_sdk.utils

import com.google.gson.FieldNamingPolicy
import com.google.gson.Gson
import com.xfers.xfers_sdk.Xfers
import java.io.InputStream
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.BufferedInputStream
import java.io.BufferedReader
import java.io.InputStreamReader

object NetworkClient {

    // Constants
    private val userApiKeyHeader = "X-XFERS-USER-API-KEY"

    // Helper objects
    val gson = Gson()
            .newBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .create()

    // HTTP methods
    fun get(url: String): InputStream? {
        val requestBuilder = Request.Builder().url(url)

        requestBuilder.header(userApiKeyHeader, XfersConfiguration.userApiKey)

        val request = requestBuilder.build()

        val response = OkHttpClient().newCall(request).execute()
        val body = response.body()

        return body?.byteStream()
    }

    // Utility methods
    fun readStream(inputStream: BufferedInputStream): String {
        val bufferedReader = BufferedReader(InputStreamReader(inputStream))
        val stringBuilder = StringBuilder()

        bufferedReader.forEachLine { stringBuilder.append(it) }

        return stringBuilder.toString()
    }
}
