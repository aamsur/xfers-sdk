package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.*
import com.xfers.xfers_sdk.model.request.*
import com.xfers.xfers_sdk.model.response.TransferInfoResponse
import com.xfers.xfers_sdk.model.response.UserActivityResponse
import com.xfers.xfers_sdk.model.response.WithdrawalRequestResponse
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.utils.network.NetworkClient
import io.reactivex.Observable
import java.math.BigDecimal

class XfersRepository {
    private val xfersApiService = NetworkClient.provideXfersApiService()

    // User related APIs

    fun getUserDetails(): Observable<User> {
        return xfersApiService.getUserDetails()
    }

    fun updateUserDetails(
            ktpNumber: String, fullName: String, countryOfBirth: String, dateOfBirth: String,
            motherMaidenName: String, email: String, ktpBase64: String, selfieBase64: String
    ): Observable<User> {
        return xfersApiService.updateUserDetails(
                UpdateUserDetailsRequest(
                        ktpNumber,
                        fullName,
                        countryOfBirth,
                        dateOfBirth,
                        motherMaidenName,
                        email,
                        ktpBase64,
                        selfieBase64
                )
        )
    }

    // Withdrawal related APIs

    fun createWithdrawalRequest(bankId: Int, amount: BigDecimal): Observable<WithdrawalRequestResponse> {
        return xfersApiService.createWithdrawalRequest(
                bankId.toString(),
                CreateWithdrawalRequest(amount.toString())
        )
    }

    // Charge related APIs

    // FIXME: Hard-coded debit_only == true now cos we currently only create charge if user has sufficient balance
    // FIXME: This is currently hardcoded to be using Contractual Model, not Transactional Model since we only support Indonesia
    fun createCharge(amount: BigDecimal, orderId: String, description: String = "", debitOnly: String = "true", currency: String = XfersConfiguration.getCurrencyCodeString()): Observable<Charge> {
        return xfersApiService.createCharge(
                CreateChargeRequest(
                        amount.toString(),
                        orderId,
                        debitOnly,
                        description,
                        currency
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

    // Topup related APIs

    fun getTopupInstructions(bank: String, disableVa: Boolean): Observable<TransferInfoResponse> {
        return xfersApiService.getTopupInstructions(bank, disableVa)
    }

    // Transaction History related APIs

    fun getActivities(limit: Int): Observable<UserActivityResponse> {
        return xfersApiService.getActivities(limit)
    }
}
