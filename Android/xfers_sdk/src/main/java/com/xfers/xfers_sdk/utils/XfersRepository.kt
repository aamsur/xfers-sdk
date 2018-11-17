package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.AddBankRequest
import com.xfers.xfers_sdk.model.Bank
import com.xfers.xfers_sdk.model.UserBankAccount
import io.reactivex.Observable

class XfersRepository {
    private val xfersApiService = NetworkClient.provideXfersApiService()

    fun getAvailableBanks(): Observable<List<Bank>> {
        return xfersApiService.getAvailableBanks()
    }

    fun getUserBanks(): Observable<List<UserBankAccount>> {
        return xfersApiService.getUserBanks()
    }

    fun addUserBank(bank: String, accountHolderName: String, accountNumber: String): Observable<UserBankAccount> {
        return xfersApiService.addUserBank(AddBankRequest(bank, accountHolderName, accountNumber))
    }

    fun deleteUserBank(bankId: Int): Observable<List<UserBankAccount>> {
        return xfersApiService.deleteUserBank(bankId.toString())
    }
}
