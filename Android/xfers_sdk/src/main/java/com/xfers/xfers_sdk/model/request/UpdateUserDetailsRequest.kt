package com.xfers.xfers_sdk.model.request

data class UpdateUserDetailsRequest(
        val firstName: String? = null,
        val lastName: String? = null,
        val email: String? = null
        // TODO: More to add depending on ID / SG etc.
)
