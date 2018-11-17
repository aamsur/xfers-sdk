package com.xfers.xfers_sdk.model

data class WithdrawalRequest(
        val id: String?,
        val accountNo: String?,
        val bankAbbrev: String?,
        val amount: String?,
        val fees: String?,
        val express: String?,
        val status: String?,
        val arrival: String?
)
