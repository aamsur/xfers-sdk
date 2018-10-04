package com.xfers.xfers_sdk.utils

object XfersConfiguration {
    // SG
    private val sgSandboxApiBase = "https://sandbox.xfers.io/api/v3"
    private val sgProductionApiBase = "https://www.xfers.io/api/v3"

    // ID
    private val idSandboxApiBase = "https://sandbox-id.xfers.com/api/v3"
    private val idProductionApiBase = "https://id.xfers.com/api/v3"

    // Settings
    var apiKey = ""
    var userApiKey = ""
    private var apiBase = ""

    fun setSGSandbox() {
        apiBase = sgSandboxApiBase
    }

    fun setSGProduction() {
        apiBase = sgProductionApiBase
    }

    fun setIDSandbox() {
        apiBase = idSandboxApiBase
    }

    fun setIDProduction() {
        apiBase = idProductionApiBase
    }

    fun getApiBase(): String {
        return apiBase
    }
}
