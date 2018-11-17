package com.xfers.xfers_sdk.model.request

data class CreateChargeRequest(
        val amount: String,
        val currency: String,
        val order_id: String,
        val description: String?
)
