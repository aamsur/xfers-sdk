package com.xfers.xfers_sdk

import android.content.Context
import android.content.Intent
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import com.xfers.xfers_sdk.utils.NetworkClient
import com.xfers.xfers_sdk.utils.XfersConfiguration
import com.xfers.xfers_sdk.view.connect.ConnectPhoneActivity
import com.xfers.xfers_sdk.view.topup.TopupBankSelectionActivity
import com.xfers.xfers_sdk.view.pay.PaymentConfirmationActivity
import com.xfers.xfers_sdk.view.kyc.KycDocumentPreparationActivity
import com.xfers.xfers_sdk.view.manage_banks.ManageBankAccountsActivity
import com.xfers.xfers_sdk.view.withdrawal.WithdrawalAmountActivity
import com.xfers.xfers_sdk.view.shared.StatusCardBaseActivity
import java.io.BufferedInputStream
import java.math.BigInteger

// This is where we add things like Xfers.flow.startKYCFlow and Xfers.api.getUserDetails etc.
class Xfers(val context: Context) {

    // enum classes
    enum class Country {
        SG, ID
    }

    enum class Environment {
        PRODUCTION, SANDBOX
    }

    // Nested classes
    inner class Config {
        fun setSDKConfigurations(country: Country, environment: Environment) {
            XfersConfiguration.setSDKConfigurations(country, environment)
        }

        fun setMerchantConfigurations(apiBase: String, name: String, logo: Int, logoTint: Int) {
            XfersConfiguration.setMerchantConfigurations(apiBase, name, logo, logoTint)
        }

        fun setUserApiKey(apiKey: String) {
            XfersConfiguration.setUserApiKey(apiKey)
        }
    }

    inner class Flow {
        fun startConnectFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ConnectPhoneActivity::class.java))
        }

        fun startTopupFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, TopupBankSelectionActivity::class.java))
        }

        fun startKYCFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, KycDocumentPreparationActivity::class.java))
        }

        fun startManageBanksFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, ManageBankAccountsActivity::class.java))
        }

        fun startWithdrawalFlow() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, WithdrawalAmountActivity::class.java))
        }

        // Optional description, will appear in receipt
        fun startPaymentFlow(amount: BigInteger, description: String? = null) {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            // TODO: Pass amount and description into activity
            context.startActivity(Intent(context, PaymentConfirmationActivity::class.java))
        }
    }

    inner class UI {
        private val comingSoonIntent: Intent = Intent(context, StatusCardBaseActivity::class.java)

        init {
            val cardText = buildSpannedString {
                bold {
                    append(context.getString(R.string.coming_soon_subtitle))
                }
                append("\n\n")
                append(context.getString(R.string.coming_soon_copy))
            }

            comingSoonIntent.putExtra("statusCardConfig",
                    hashMapOf(
                            "cardPageTitle" to context.getString(R.string.coming_soon_title),
                            "statusIconImage" to R.drawable.status_wip_60,
                            "extendedTopbarBackgroundColor" to R.color.lightGray,
                            "statusIconImage" to R.drawable.status_wip_60,
                            "statusIconImageColorFilter" to R.color.lightGray,
                            "showMerchantXfersLogos" to false,
                            "cardText" to cardText,
                            "buttonText" to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName())
                    )
            )
        }

        fun startMenuActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(comingSoonIntent)
        }

        fun startSettingsActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(comingSoonIntent)
        }

        fun startTransactionsOverviewActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(comingSoonIntent)
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
