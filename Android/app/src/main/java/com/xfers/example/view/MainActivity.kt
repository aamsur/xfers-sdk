package com.xfers.example.view

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.View
import com.xfers.example.R
import com.xfers.xfers_sdk.Xfers
import java.math.BigDecimal

class MainActivity : AppCompatActivity() {

    // Put your Base URL here, this is the Base URL that we will call for Connect flow, for e.g.
    // https://bright-sunshine-91728.herokuapp.com/
    private val merchantApiBase = "http://10.0.2.2:3000"

    // Put your name here, this is the name that we will use to refer to you in the SDK, for e.g.
    // Best Merchant
    private val merchantName = "Your Name"

    // Put your logo source here, this is the image that we will use to refer to you in the SDK, for e.g.
    // R.drawable.your_logo
    private val merchantLogo = R.drawable.ic_launcher_foreground

    // Put your logo tint here, this is the color that we will use to tint your logo in the SDK, for e.g.
    // R.color.your_color
    private val merchantLogoTint = R.color.colorPrimary

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val xfers = Xfers(this)

        xfers.config.setSDKConfigurations(Xfers.Country.SG, Xfers.Environment.SANDBOX)
        xfers.config.setMerchantConfigurations(merchantApiBase, merchantName, merchantLogo, merchantLogoTint)
    }

    fun onClickXfersConnect(view: View) {
        Xfers(this).flow.startConnectFlow()
    }

    fun onClickTopup(view: View) {
        Xfers(this).flow.startTopupFlow()
    }

    fun onClickTransactionsOverview(view: View) {
        Xfers(this).ui.startTransactionsOverviewActivity()
    }

    fun onClickKYC(view: View) {
        Xfers(this).flow.startKYCFlow()
    }

    fun onClickManageBanks(view: View) {
        Xfers(this).flow.startManageBanksFlow()
    }

    fun onClickWithdrawal(view: View) {
        Xfers(this).flow.startWithdrawalFlow()
    }

    fun onClickPay(view: View) {
        Xfers(this).flow.startPaymentFlow(BigDecimal("100"))
    }

    fun onClickMenu(view: View) {
        Xfers(this).ui.startMenuActivity()
    }

    fun onClickSettings(view: View) {
        Xfers(this).ui.startSettingsActivity()
    }
}
