package com.xfers.xfers_sdk.utils

import com.google.gson.FieldNamingPolicy
import com.google.gson.Gson
import okhttp3.MediaType
import java.io.InputStream
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
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

    fun post(url: String, paramsJson: String): InputStream? {
        val requestBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), paramsJson)
        val request = Request.Builder().url(url).post(requestBody).build()

        val response = OkHttpClient().newCall(request).execute()
        val responseBody = response.body()

        return responseBody?.byteStream()
    }

    // Utility methods
    fun readStream(inputStream: BufferedInputStream): String {
        val bufferedReader = BufferedReader(InputStreamReader(inputStream))
        val stringBuilder = StringBuilder()

        bufferedReader.forEachLine { stringBuilder.append(it) }

        return stringBuilder.toString()
    }
}
