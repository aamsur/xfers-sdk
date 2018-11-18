package com.xfers.xfers_sdk.model

data class Charge(
        val amount: String?,
        val currency: String?,
        val order_id: String?,
        val description: String?,
        val success: Boolean,
        val id: String?,
        // FIXME: object is a reserved keyword in Kotlin, fix backend first before fixing this
        // val object: String?,
        val wallet_name: String?,
        val receipt_email: String?,
        val meta_data: String?
)
