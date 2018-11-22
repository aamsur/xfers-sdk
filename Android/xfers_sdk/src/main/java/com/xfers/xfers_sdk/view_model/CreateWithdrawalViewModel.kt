package com.xfers.xfers_sdk.view_model

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.response.WithdrawalRequestResponse
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers
import java.math.BigDecimal

class CreateWithdrawalViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val withdrawal = MutableLiveData<WithdrawalRequestResponse>()
    private var subscription: Disposable? = null

    fun submitWithdrawalRequest(context: Context, bankId: Int, amount: BigDecimal): LiveData<WithdrawalRequestResponse> {
        subscription = xfersRepository.createWithdrawalRequest(context, bankId, amount)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onSubmitWithdrawalRequestStart() }
                .doOnTerminate { onSubmitWithdrawalRequestFinish() }
                .subscribe(
                        { onSubmitWithdrawalRequestSuccess(it) },
                        { onSubmitWithdrawalRequestError() }
                )

        return withdrawal
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onSubmitWithdrawalRequestStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onSubmitWithdrawalRequestFinish() {
        // TODO: Provide observable to show
    }

    private fun onSubmitWithdrawalRequestSuccess(withdrawalRequestResponse: WithdrawalRequestResponse) {
        withdrawal.postValue(withdrawalRequestResponse)
    }

    private fun onSubmitWithdrawalRequestError() {
        // TODO: Provide observable to show error on view
    }
}
