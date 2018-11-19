package com.xfers.xfers_sdk.model

data class UserActivity(
        val id: String?,
        val amount: String?,
        val fee: String?,
        val createdAt: String?,
        val status: String?,
        val type: String?,
        val metadata: UserActivityMetadata?,
        val walletName: String?
)
