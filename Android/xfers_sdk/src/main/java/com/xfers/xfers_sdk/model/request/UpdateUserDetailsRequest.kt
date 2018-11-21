package com.xfers.xfers_sdk.model.request

data class UpdateUserDetailsRequest(
        val identity_no: String, // ktpNumber / nricNumber
        val full_name: String, // fullName TODO: Check if we gonna use full name or first name / last name
        val country: String, // countryOfBirth
        val date_of_birth: String, // dateOfBirth
        val mother_maiden_name: String, // motherMaidenName
        val email: String, // email
        val ktpFront: String, // ktpBase64 TODO: name not yet finalised on API
        val selfie: String // selfieBase64 TODO: name not yet finalised on API
        // TODO: More to add depending on ID / SG etc.
)
