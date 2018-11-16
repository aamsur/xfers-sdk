package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.UserBankAccount
import io.reactivex.Observable

class XfersRepository {
    private val xfersApiService = NetworkClient.provideXfersApiService()

    fun getUserBanks(): Observable<List<UserBankAccount>> {
        return xfersApiService.getUserBanks()
    }
}
