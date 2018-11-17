package com.xfers.xfers_sdk.utils.config

import android.content.Context
import android.graphics.Color
import com.xfers.xfers_sdk.Xfers
import com.xfers.xfers_sdk.utils.services.apis.xfersUserApiKeyHeader

object XfersConfiguration {
    // SG
    private val sgSandboxApiBase = "https://sandbox.xfers.io/api/v3/"
    private val sgProductionApiBase = "https://www.xfers.io/api/v3/"

    // ID
    private val idSandboxApiBase = "https://sandbox-id.xfers.com/api/v3/"
    private val idProductionApiBase = "https://id.xfers.com/api/v3/"

    // Settings
    private var apiBase = ""
    private var currentCountry: Xfers.Country? = null

    // Merchant Settings
    private var merchantApiBase = ""
    private var merchantName = ""
    private var merchantLogo: Int? = null
    private var merchantLogoTint = Color.TRANSPARENT
    private var merchantFlowStartingContextClass: Class<out Context>? = null

    // TODO: Implement Android Keystore handling of userApiKey
    private var userApiKey = ""

    fun setSDKConfigurations(country: Xfers.Country, environment: Xfers.Environment) {
        if (country == Xfers.Country.SG && environment == Xfers.Environment.PRODUCTION) {
            apiBase = sgProductionApiBase
        } else if (country == Xfers.Country.SG && environment == Xfers.Environment.SANDBOX) {
            apiBase = sgSandboxApiBase
        } else if (country == Xfers.Country.ID && environment == Xfers.Environment.PRODUCTION) {
            apiBase = idProductionApiBase
        } else if (country == Xfers.Country.ID && environment == Xfers.Environment.SANDBOX) {
            apiBase = idSandboxApiBase
        } else {
            // TODO: Throw custom Xfers exception with better error message
            throw Exception("Not a valid Xfers SDK configuration, please refer to README.md on GitHub for more information.")
        }

        currentCountry = country
    }

    fun setMerchantConfigurations(apiBase: String, name: String, logo: Int, logoTint: Int) {
        merchantApiBase = apiBase
        merchantName = name
        merchantLogo = logo
        merchantLogoTint = logoTint
    }

    fun setMerchantFlowStartingContext(context: Context) {
        merchantFlowStartingContextClass = context::class.java
    }

    fun setUserApiKey(apiKey: String) {
        // TODO: Implement more secure way of handling userApiKey
        userApiKey = apiKey
    }

    fun getApiBase(): String {
        return apiBase
    }

    fun getMerchantApiBase(): String {
        return merchantApiBase
    }

    fun getMerchantName(): String {
        return merchantName
    }

    fun getMerchantLogo(): Int? {
        return merchantLogo
    }

    fun getMerchantLogoTint(): Int {
        return merchantLogoTint
    }

    fun getMerchantFlowStartingContextClass(): Class<out Context>? {
        return merchantFlowStartingContextClass
    }

    fun getCurrentCountry(): Xfers.Country? {
        return currentCountry
    }

    fun getUserApiKey(): String {
        return userApiKey
    }

    fun getXfersUserApiKeyHeader(): String{
        return xfersUserApiKeyHeader
    }
}
