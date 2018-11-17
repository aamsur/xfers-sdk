package com.xfers.xfers_sdk.model

data class TransferInfo(
        val bankNameFull: String?,
        val bankAbbrev: String?,
        val bankAccountNo: String?,
        val bankCode: String?,
        val branchCode: String?,
        val branchArea: String?,
        val uniqueId: String?
        // TODO: More to add and also to localise for Indo, check backend response
)
