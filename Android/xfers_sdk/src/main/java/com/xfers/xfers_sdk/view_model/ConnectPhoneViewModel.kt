package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.response.OkResponse
import com.xfers.xfers_sdk.utils.MerchantRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class ConnectPhoneViewModel : ViewModel() {
    private val merchantRepository = MerchantRepository()
    val connectPhoneSuccess: MutableLiveData<Boolean> = MutableLiveData()
    private var subscription: Disposable? = null

    fun connectPhoneNumber(phoneNumber: String): LiveData<Boolean> {
        subscription = merchantRepository.signupLogin(phoneNumber)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onConnectPhoneStart() }
                .doOnTerminate { onConnectPhoneFinish() }
                .subscribe(
                        { onConnectPhoneSuccess(it) },
                        { onConnectPhoneError() }
                )

        return connectPhoneSuccess
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onConnectPhoneStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onConnectPhoneFinish() {
        // TODO: Provide observable to show
    }

    private fun onConnectPhoneSuccess(okResponse: OkResponse) {
        // Example response expected:
        // {
        //   "msg": "success"
        // }
        if (okResponse.msg == "success") {
            connectPhoneSuccess.postValue(true)
        }
    }

    private fun onConnectPhoneError() {
        // TODO: Provide observable to show error on view
    }
}
