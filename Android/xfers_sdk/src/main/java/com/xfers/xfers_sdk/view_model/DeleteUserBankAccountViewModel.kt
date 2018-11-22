package com.xfers.xfers_sdk.view_model

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class DeleteUserBankAccountViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    val deleteBankAccountSuccess = MutableLiveData<Boolean>()
    private var subscription: Disposable? = null

    fun deleteUserBankAccount(context: Context, bankId: Int): LiveData<Boolean> {
        subscription = xfersRepository.deleteUserBank(context, bankId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onDeleteUserBankStart() }
                .doOnTerminate { onDeleteUserBankFinish() }
                .subscribe(
                        { onDeleteUserBankSuccess() },
                        { onDeleteUserBankError() }
                )

        return deleteBankAccountSuccess
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onDeleteUserBankStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onDeleteUserBankFinish() {
        // TODO: Provide observable to show
    }

    private fun onDeleteUserBankSuccess() {
        deleteBankAccountSuccess.postValue(true)
    }

    private fun onDeleteUserBankError() {
        // TODO: Provide observable to show error on view
    }
}
