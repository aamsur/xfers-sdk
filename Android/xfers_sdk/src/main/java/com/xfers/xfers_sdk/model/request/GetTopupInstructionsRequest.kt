package com.xfers.xfers_sdk.model.request

data class GetTopupInstructionsRequest(
        val bank: String, // Bank abbreviation
        val disable_va: Boolean
)
