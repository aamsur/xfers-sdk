package com.xfers.xfers_sdk.model

data class Charge(
        val amount: String?,
        val currency: String?,
        val orderId: String?,
        val description: String?,
        val success: Boolean,
        val id: String?,
        // FIXME: object is a reserved keyword in Kotlin, fix backend first before fixing this
        // val object: String?,
        val walletName: String?,
        val receiptEmail: String?,
        val metaData: String?
)
