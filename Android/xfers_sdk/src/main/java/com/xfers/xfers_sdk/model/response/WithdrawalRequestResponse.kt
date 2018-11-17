package com.xfers.xfers_sdk.model.response

import com.xfers.xfers_sdk.model.request.WithdrawalRequest

data class WithdrawalRequestResponse(
    val availableBalance: String?,
    val ledgerBalance: String?,
    val withdrawalRequest: WithdrawalRequest?
)
