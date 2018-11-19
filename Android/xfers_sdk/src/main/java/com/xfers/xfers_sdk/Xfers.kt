package com.xfers.xfers_sdk

import android.content.Context
import android.content.Intent
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.connect.ConnectTermsOfServiceActivity
import com.xfers.xfers_sdk.view.topup.TopupBankSelectionActivity
import com.xfers.xfers_sdk.view.pay.PaymentConfirmationActivity
import com.xfers.xfers_sdk.view.kyc.KycDocumentPreparationActivity
import com.xfers.xfers_sdk.view.manage_banks.ManageBankAccountsActivity
import com.xfers.xfers_sdk.view.menu.XfersMenuActivity
import com.xfers.xfers_sdk.view.pay.PaymentConstants
import com.xfers.xfers_sdk.view.transactions_history.TransactionsHistoryActivity
import com.xfers.xfers_sdk.view.withdrawal.WithdrawalBankSelectionActivity
import java.math.BigDecimal
import java.util.*

// This is where we add things like Xfers.flow.startKYCFlow and Xfers.api.getUserDetails etc.
class Xfers(private val context: Context) {

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
            context.startActivity(Intent(context, ConnectTermsOfServiceActivity::class.java))
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
            context.startActivity(Intent(context, WithdrawalBankSelectionActivity::class.java))
        }

        // Optional description, will appear in receipt
        // Optional orderId, if merchant does not give us, we will generate a random UUID
        fun startPaymentFlow(amount: BigDecimal, orderId: String? = null, description: String = "") {
            XfersConfiguration.setMerchantFlowStartingContext(context)

            context.startActivity(
                    Intent(context, PaymentConfirmationActivity::class.java).apply {
                        this.putExtra(PaymentConstants.amount, amount)
                        this.putExtra(PaymentConstants.orderId, orderId ?: UUID.randomUUID().toString())
                        this.putExtra(PaymentConstants.description, description)
                    }
            )
        }
    }

    inner class UI {
        fun startMenuActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, XfersMenuActivity::class.java))
        }

        fun startSettingsActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            XfersStatusCardService(context).presentComingSoonStatusCard()
        }

        fun startTransactionsOverviewActivity() {
            XfersConfiguration.setMerchantFlowStartingContext(context)
            context.startActivity(Intent(context, TransactionsHistoryActivity::class.java))
        }
    }

    inner class API {
        // TODO: Empty for now, things will be added when we want to and start exposing APIs via the SDK
    }

    // Nested class constants for namespacing
    val config = Config()
    val flow = Flow()
    val ui = UI()
    val api = API()
}
