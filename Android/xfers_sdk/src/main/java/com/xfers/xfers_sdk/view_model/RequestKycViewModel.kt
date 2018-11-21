package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.User
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class RequestKycViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val userKycRequestSuccess = MutableLiveData<User>()
    private var subscription: Disposable? = null

    fun updateUserDetails(
            ktpNumber: String, fullName: String, countryOfBirth: String, dateOfBirth: String,
            motherMaidenName: String, email: String, ktpBase64: String, selfieBase64: String
    ): LiveData<User> {
        subscription = xfersRepository
                .updateUserDetails(
                        ktpNumber, fullName, countryOfBirth, dateOfBirth, motherMaidenName,
                        email, ktpBase64, selfieBase64
                )
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onAddUserBankAccountStart() }
                .doOnTerminate { onAddUserBankAccountFinish() }
                .subscribe(
                        { onAddUserBankAccountSuccess(it) },
                        { onAddUserBankAccountError() }
                )

        return userKycRequestSuccess
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

    private fun onAddUserBankAccountSuccess(user: User) {
        userKycRequestSuccess.postValue(user)
    }

    private fun onAddUserBankAccountError() {
        // TODO: Provide observable to show error on view
    }
}
