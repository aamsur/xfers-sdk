package com.xfers.xfers_sdk.model

data class WithdrawalRequestResponse(
    val availableBalance: String?,
    val ledgerBalance: String?,
    val withdrawalRequest: WithdrawalRequest?
)
