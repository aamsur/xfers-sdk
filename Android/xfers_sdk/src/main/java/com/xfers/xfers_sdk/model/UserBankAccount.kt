package com.xfers.xfers_sdk.model

data class UserBankAccount(
        val id: Int?,
        val accountNo: String?,
        val accountHolderName: String?,
        val verificationStatus: String?,
        val bankAbbrev: String?,
        val usage: String?
)
