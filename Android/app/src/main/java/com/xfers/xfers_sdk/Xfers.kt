package com.xfers.xfers_sdk

import android.content.Context
import com.google.gson.FieldNamingPolicy
import com.google.gson.Gson
import com.xfers.xfers_sdk.model.User
import com.xfers.xfers_sdk.utils.NetworkClient
import com.xfers.xfers_sdk.utils.XfersConfiguration
import java.io.BufferedInputStream
import java.io.BufferedReader
import java.io.InputStreamReader

// This is where we add things like Xfers.startKycFlow and Xfers.connectUser etc.
class Xfers(val context: Context) {

    val gson = Gson()
            .newBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .create()

    fun getUserDetails(): User? {
        val response = readStream(
                BufferedInputStream(
                        NetworkClient().get(
                                "${XfersConfiguration.getApiBase()}/user",
                                userApiKey = XfersConfiguration.userApiKey
                        )
                )
        )

        return gson.fromJson(response, User::class.java)
    }

    private fun readStream(inputStream: BufferedInputStream): String {
        val bufferedReader = BufferedReader(InputStreamReader(inputStream))
        val stringBuilder = StringBuilder()

        bufferedReader.forEachLine { stringBuilder.append(it) }

        return stringBuilder.toString()
    }
}
