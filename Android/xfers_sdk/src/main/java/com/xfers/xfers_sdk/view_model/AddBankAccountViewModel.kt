package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.Bank
import com.xfers.xfers_sdk.model.UserBankAccount
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class AddBankAccountViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    val userBankAccountSuccess = MutableLiveData<UserBankAccount>()
    val userBankAccountFailure = MutableLiveData<Boolean>()
    private var subscription: Disposable? = null

    fun addUserBankAccount(bankAbbreviation: String, accountHolderName: String, accountNumber: String): LiveData<UserBankAccount> {
        subscription = xfersRepository.addUserBank(bankAbbreviation, accountHolderName, accountNumber)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onAddUserBankAccountStart() }
                .doOnTerminate { onAddUserBankAccountFinish() }
                .subscribe(
                        { onAddUserBankAccountSuccess(it) },
                        { onAddUserBankAccountError() }
                )

        return userBankAccountSuccess
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onAddUserBankAccountStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onAddUserBankAccountFinish() {
        // TODO: Provide observable to show
    }

    private fun onAddUserBankAccountSuccess(userBankAccount: UserBankAccount) {
        userBankAccountSuccess.postValue(userBankAccount)
    }

    private fun onAddUserBankAccountError() {
        userBankAccountFailure.postValue(true)
    }
}
