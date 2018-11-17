package com.xfers.xfers_sdk.model

data class AddBankRequest(
        val bank: String, // Bank abbreviation
        val account_holder_name: String,
        val account_no: String
)
