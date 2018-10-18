package com.xfers.xfers_sdk.utils

enum class Country { SG, ID }

object XfersConfiguration {
    // SG
    private val sgSandboxApiBase = "https://sandbox.xfers.io/api/v3"
    private val sgProductionApiBase = "https://www.xfers.io/api/v3"

    // ID
    private val idSandboxApiBase = "https://sandbox-id.xfers.com/api/v3"
    private val idProductionApiBase = "https://id.xfers.com/api/v3"

    // Settings
    private var apiBase = ""
    private var currentCountry: Country? = null

    // Merchant Settings
    private var merchantApiBase = ""
    private var merchantName = ""
    private var merchantLogo: Int? = null

    // TODO: Implement Android Keystore handling of userApiKey
    var userApiKey = ""

    fun setSGSandbox() {
        currentCountry = Country.SG
        apiBase = sgSandboxApiBase
    }

    fun setSGProduction() {
        currentCountry = Country.SG
        apiBase = sgProductionApiBase
    }

    fun setIDSandbox() {
        currentCountry = Country.ID
        apiBase = idSandboxApiBase
    }

    fun setIDProduction() {
        currentCountry = Country.ID
        apiBase = idProductionApiBase
    }

    fun setMerchantApiBase(apiBase: String) {
        merchantApiBase = apiBase
    }

    fun setMerchantName(name: String) {
        merchantName = name
    }

    fun setMerchantLogo(logo: Int) {
        merchantLogo = logo
    }

    fun buildApiURL(apiPath: String): String {
        return "$apiBase/$apiPath"
    }

    fun buildMerchantApiURL(apiPath: String): String {
        return "$merchantApiBase/$apiPath"
    }

    fun getMerchantName(): String {
        return merchantName
    }

    fun getMerchantLogo(): Int? {
        return merchantLogo
    }

    fun getCurrentCountry(): Country? {
        return currentCountry
    }
}
