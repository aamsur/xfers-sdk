package com.xfers.xfers_sdk.model.request

data class CreateChargeRequest(
        val amount: String,
        val order_id: String,
        val debit_only: String,
        val description: String,
        val currency: String
)
