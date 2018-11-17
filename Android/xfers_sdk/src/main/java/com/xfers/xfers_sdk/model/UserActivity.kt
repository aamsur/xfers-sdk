package com.xfers.xfers_sdk.model

data class UserActivity(
        val id: String?,
        val amount: String?,
        val fees: String?,
        val createdAt: String?,
        val status: String?,
        val metadata: UserActivityMetadata?,
        val walletName: String?
)
