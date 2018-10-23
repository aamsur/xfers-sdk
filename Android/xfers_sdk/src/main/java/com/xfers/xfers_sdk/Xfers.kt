package com.xfers.xfers_sdk

import android.content.Context
import android.content.Intent
import android.graphics.Color
import com.xfers.xfers_sdk.utils.NetworkClient
import com.xfers.xfers_sdk.utils.XfersConfiguration
import com.xfers.xfers_sdk.view.ComingSoonActivity
import com.xfers.xfers_sdk.view.ConnectPhoneActivity
import java.io.BufferedInputStream
import java.math.BigInteger

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

        fun setMerchantApiBase(apiBase: String) {
            XfersConfiguration.setMerchantApiBase(apiBase)
        }

        fun setMerchantName(name: String) {
            XfersConfiguration.setMerchantName(name)
        }

        fun setMerchantLogo(logo: Int) {
            XfersConfiguration.setMerchantLogo(logo)
        }

        fun setMerchantLogoTint(tint: Int) {
            XfersConfiguration.setMerchantLogoTint(tint)
        }

        // TODO: Implement Android Keystore handling of userApiKey
        fun setUserApiKey(apiKey: String) {
            return
        }
    }

    inner class Flow {
        fun startConnectFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ConnectPhoneActivity::class.java))
        }

        fun startTopupFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ComingSoonActivity::class.java))
        }

        fun startKYCFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ComingSoonActivity::class.java))
        }

        fun startManageBanksFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ComingSoonActivity::class.java))
        }

        fun startWithdrawalFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ComingSoonActivity::class.java))
        }

        // Optional description, will appear in receipt
        fun startPaymentFlow(amount: BigInteger, description: String? = null) {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            // TODO: Pass amount and description into activity
            context.startActivity(Intent(context, ComingSoonActivity::class.java))
        }
    }

    inner class UI {
        fun startMenuActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ComingSoonActivity::class.java))
        }

        fun startSettingsActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ComingSoonActivity::class.java))
        }

        fun startTransactionsOverviewActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
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
    val flow = Flow()
    val ui = UI()
    val api = API()
}
