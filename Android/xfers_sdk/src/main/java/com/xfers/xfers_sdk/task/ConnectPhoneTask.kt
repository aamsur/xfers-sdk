package com.xfers.xfers_sdk.task

import android.content.Context
import android.content.Intent
import android.os.AsyncTask
import com.google.gson.Gson
import com.xfers.xfers_sdk.model.OkMessage
import com.xfers.xfers_sdk.model.SignupLoginRequest
import com.xfers.xfers_sdk.utils.NetworkClient
import com.xfers.xfers_sdk.utils.XfersConfiguration
import com.xfers.xfers_sdk.view.ConnectOTPActivity
import java.io.BufferedInputStream
import java.lang.ref.WeakReference

class ConnectPhoneTask(context: Context, phoneNumber: String) : AsyncTask<Unit, Unit, String>() {
    private val innerContext: WeakReference<Context> = WeakReference(context)
    private val innerPhoneNumber: WeakReference<String> = WeakReference(phoneNumber)

    override fun doInBackground(vararg params: Unit?): String? {
        innerContext.get()?.let { _ ->
            innerPhoneNumber.get()?.let { phoneNumber ->
                return NetworkClient.readStream(
                        BufferedInputStream(
                                NetworkClient.post(
                                        XfersConfiguration.buildMerchantApiURL("signup_login"),
                                        Gson().toJson(SignupLoginRequest(phoneNumber))
                                )
                        )
                )
            }
        }

        return null
    }

    override fun onPostExecute(result: String?) {
        super.onPostExecute(result)

        // Response body expected:
        // {
        //   "msg": "success"
        // }
        val okMessage = Gson().fromJson(result, OkMessage::class.java)

        innerContext.get()?.let {
            if (okMessage.msg == "success") {
                it.startActivity(Intent(it, ConnectOTPActivity::class.java))
            } else {
                // TODO: Something went wrong, display error message with a toast
            }
        }
    }
}
