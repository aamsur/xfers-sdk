package com.xfers.xfers_sdk.model.response

import com.xfers.xfers_sdk.model.TransferInfo

data class TransferInfoResponse(
        val uniqueId: String?,
        val walletName: String?,
        val bankNameFull: String?,
        val bankAbbrev: String?,
        val bankNameAbbreviation: String?,
        val bankAccountNo: String?,
        val bankCode: String?,
        val branchCode: String?,
        val branchArea: String?,
        val imgSrc: String?,
        val transferInfoArray: List<TransferInfo>?
)