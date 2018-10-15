package com.xfers.xfers_sdk

import android.content.Context
import android.content.Intent
import android.support.v4.content.ContextCompat.startActivity
import com.xfers.xfers_sdk.utils.NetworkClient
import com.xfers.xfers_sdk.utils.XfersConfiguration
import com.xfers.xfers_sdk.view.ComingSoonActivity
import java.io.BufferedInputStream

// This is where we add things like Xfers.flow.startKYCFlow and Xfers.api.getUserDetails etc.
class Xfers(val context: Context) {

    // Nested classes
    inner class Config {
        fun setSGSandbox() {
            XfersConfiguration.setSGSandbox()
        }

        fun setSGProduction() {
            XfersConfiguration.setSGProduction()
        }

        fun setIDSandbox() {
            XfersConfiguration.setIDSandbox()
        }

        fun setIDProduction() {
            XfersConfiguration.setIDProduction()
        }

        // TODO: Implement Android Keystore handling of userApiKey
        fun setUserApiKey() {
            return
        }
    }

    inner class UI {
        fun startComingSoonActivity() {
            context.startActivity(Intent(context, ComingSoonActivity::class.java))
        }
    }

    inner class API {
        fun getUserDetails(): String {
            return NetworkClient.readStream(
                    BufferedInputStream(
                            NetworkClient.get(
                                    XfersConfiguration.buildApiURL("user")
                            )
                    )
            )
        }
    }

    // Nested class constants for namespacing
    val config = Config()
    val ui = UI()
    val api = API()
}
