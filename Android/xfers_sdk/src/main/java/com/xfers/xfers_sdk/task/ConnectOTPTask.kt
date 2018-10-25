package com.xfers.xfers_sdk.task

import android.content.Context
import android.content.Intent
import android.os.AsyncTask
import com.google.gson.Gson
import com.xfers.xfers_sdk.model.OTPRequest
import com.xfers.xfers_sdk.model.UserApiKey
import com.xfers.xfers_sdk.utils.NetworkClient
import com.xfers.xfers_sdk.utils.XfersConfiguration
import com.xfers.xfers_sdk.view.connect.ConnectIdentityVerificationActivity
import com.xfers.xfers_sdk.view.connect.ConnectShareKYCActivity
import java.io.BufferedInputStream
import java.lang.ref.WeakReference

class ConnectOTPTask(context: Context, OTP: String) : AsyncTask<Unit, Unit, String>() {
    private val innerContext: WeakReference<Context> = WeakReference(context)
    private val innerOTP: WeakReference<String> = WeakReference(OTP)

    override fun doInBackground(vararg params: Unit?): String? {
        innerContext.get()?.let { _ ->
            innerOTP.get()?.let { OTP ->
                return NetworkClient.readStream(
                        BufferedInputStream(
                                NetworkClient.post(
                                        XfersConfiguration.buildMerchantApiURL("get_token"),
                                        Gson().toJson(OTPRequest(OTP))
                                )
                        )
                )
            }
        }

        return null
    }

    override fun onPostExecute(result: String?) {
        super.onPostExecute(result)

        // Example response expected:
        // {
        //   "apiKey": "<real_user_api_key>"
        // }
        val userApiKey = Gson().fromJson(result, UserApiKey::class.java)

        innerContext.get()?.let {
            if (!userApiKey.apiKey.isBlank()) {
                // TODO: Set dynamically based on user status queried from the server through the apiKey,
                // for now hardcode to be able to develop
                val isUserExistingVerified = true
                val isUserExistingUnverified = false
                val isUserNewUser = false

                when {
                    isUserExistingVerified -> it.startActivity(Intent(it, ConnectShareKYCActivity::class.java))
                    isUserExistingUnverified -> it.startActivity(Intent(it, ConnectIdentityVerificationActivity::class.java))
                    isUserNewUser -> it.startActivity(Intent(it, ConnectIdentityVerificationActivity::class.java))
                }
            } else {
                // TODO: Something went wrong, display error message via Toast
            }
        }
    }
}
