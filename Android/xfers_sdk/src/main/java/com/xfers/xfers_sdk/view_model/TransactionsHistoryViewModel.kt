package com.xfers.xfers_sdk.view_model

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.UserActivity
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class TransactionsHistoryViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val transactionHistories = MutableLiveData<List<UserActivity>>()
    private var subscription: Disposable? = null

    fun getTransactionHistories(context: Context, transactionHistoryLimit: Int = 50): LiveData<List<UserActivity>> {
        // TODO: Hardcoded limit
        subscription = xfersRepository.getActivities(context, transactionHistoryLimit)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onGetTransactionHistoriesStart() }
                .doOnTerminate { onGetTransactionHistoriesFinish() }
                .subscribe(
                        { onGetTransactionHistoriesSuccess(it.activities) },
                        { onGetTransactionHistoriesError() }
                )

        return transactionHistories
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onGetTransactionHistoriesStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onGetTransactionHistoriesFinish() {
        // TODO: Provide observable to show
    }

    private fun onGetTransactionHistoriesSuccess(UserActivitiesList: List<UserActivity>?) {
        transactionHistories.postValue(UserActivitiesList)
    }

    private fun onGetTransactionHistoriesError() {
        // TODO: Provide observable to show error on view
    }
}
