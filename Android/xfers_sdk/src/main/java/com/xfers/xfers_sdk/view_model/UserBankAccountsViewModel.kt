package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.UserBankAccount
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class UserBankAccountsViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val userBankAccounts = MutableLiveData<List<UserBankAccount>>()
    private var subscription: Disposable? = null

    fun getUserBankAccounts(): LiveData<List<UserBankAccount>> {
        subscription = xfersRepository.getUserBanks()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onGetUserBanksStart() }
                .doOnTerminate { onGetUserBanksFinish() }
                .subscribe(
                        { onGetUserBanksSuccess(it) },
                        { onGetUserBanksError() }
                )

        return userBankAccounts
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onGetUserBanksStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onGetUserBanksFinish() {
        // TODO: Provide observable to show
    }

    private fun onGetUserBanksSuccess(userBankAccountsList: List<UserBankAccount>) {
        userBankAccounts.postValue(userBankAccountsList)
    }

    private fun onGetUserBanksError() {
        // TODO: Provide observable to show error on view
    }
}
