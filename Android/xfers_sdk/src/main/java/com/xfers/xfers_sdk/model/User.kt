package com.xfers.xfers_sdk.model

class User(
        val firstName: String?,
        val lastName: String?,
        val email: String?,
        val kycVerified: Boolean?,
        val kycNeeded: Boolean?,
        val availableBalance: String?,
        val availableLedger: String?
)
