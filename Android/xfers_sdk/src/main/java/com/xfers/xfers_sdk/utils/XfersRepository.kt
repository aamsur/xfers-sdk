package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.*
import io.reactivex.Observable
import java.math.BigInteger

class XfersRepository {
    private val xfersApiService = NetworkClient.provideXfersApiService()

    // User related APIs

    fun getUserDetails(): Observable<User> {
        return xfersApiService.getUserDetails()
    }

    // Withdrawal related APIs

    fun createWithdrawalRequest(bankId: Int, amount: BigInteger): Observable<WithdrawalRequestResponse> {
        return xfersApiService.createWithdrawalRequest(
                bankId.toString(),
                CreateWithdrawalRequest(amount.toString())
        )
    }

    // Charge related APIs

    fun createCharage(amount: BigInteger, currency: String, orderId: String, description: String? = null): Observable<Charge> {
        return xfersApiService.createCharge(
                CreateChargeRequest(
                        amount.toString(),
                        currency,
                        orderId,
                        description
                )
        )
    }

    // Bank related APIs

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
