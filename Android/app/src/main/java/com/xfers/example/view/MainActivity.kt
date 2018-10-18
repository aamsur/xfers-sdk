package com.xfers.example.view

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import com.xfers.example.R
import com.xfers.xfers_sdk.Xfers
import java.math.BigInteger

// TODO: Example Activity (to be turned into example app)
class MainActivity : AppCompatActivity() {

    // Put your Base URL here, for e.g.
    // https://bright-sunshine-91728.herokuapp.com/
    val merchantApiBase = "<set_your_backend_api_base_here>"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val xfers = Xfers(this)

        xfers.config.setSGSandbox()
        xfers.config.setMerchantApiBase(merchantApiBase)

        // TODO: Build on top of sample code, deactivated for now
        // UpdateTextWithUserDetails(this.text, this).execute()
    }

    fun onXfersConnectClick(view: View) {
        Xfers(this).flow.startConnectFlow()
    }

    fun onTopupClick(view: View) {
        Xfers(this).flow.startTopupFlow()
    }

    fun onTransactionsOverviewClick(view: View) {
        Xfers(this).ui.startTransactionsOverviewActivity()
    }

    fun onKYCClick(view: View) {
        Xfers(this).flow.startKYCFlow()
    }

    fun onManageBanksClick(view: View) {
        Xfers(this).flow.startManageBanksFlow()
    }

    fun onWithdrawalClick(view: View) {
        Xfers(this).flow.startWithdrawalFlow()
    }

    fun onPayClick(view: View) {
        // Pass in example 100
        Xfers(this).flow.startPaymentFlow(BigInteger("100"))
    }

    fun onMenuClick(view: View) {
        Xfers(this).ui.startMenuActivity()
    }

    fun onSettingsClick(view: View) {
        Xfers(this).ui.startSettingsActivity()
    }
}
