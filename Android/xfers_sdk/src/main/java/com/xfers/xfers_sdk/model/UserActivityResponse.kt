package com.xfers.xfers_sdk.model

data class UserActivityResponse(
        val activitiesReturned: Int?,
        val limit: Int?,
        val offset: Int?,
        val startDate: String?,
        val endDate: String?,
        val activites: List<UserActivity>?
)
