package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.UserApiKey
import com.xfers.xfers_sdk.utils.MerchantRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class ConnectOTPViewModel : ViewModel() {
    private val merchantRepository = MerchantRepository()
    val connectOTPSuccess: MutableLiveData<Boolean> = MutableLiveData()
    private var subscription: Disposable? = null

    fun connectOTP(OTP: String): LiveData<Boolean> {
        subscription = merchantRepository.getToken(OTP)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onConnectOTPStart() }
                .doOnTerminate { onConnectOTPFinish() }
                .subscribe(
                        { onConnectOTPSuccess(it) },
                        { onConnectOTPError() }
                )

        return connectOTPSuccess
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onConnectOTPStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onConnectOTPFinish() {
        // TODO: Provide observable to show
    }

    private fun onConnectOTPSuccess(userApiKey: UserApiKey) {
        // Example response expected:
        // {
        //   "apiKey": "<real_user_api_key>"
        // }
        if (userApiKey.apiKey.isNotBlank()) {
            // TODO: Set dynamically based on user status queried from the server through the apiKey,
            // for now hardcode to be able to develop

            // TODO: Show different activity based on the verification status
            // val isUserExistingVerified = true
            // val isUserExistingUnverified = false
            // val isUserNewUser = false

            // when {
            //    isUserExistingVerified -> it.startActivity(Intent(it, ConnectShareKYCActivity::class.java))
            //    isUserExistingUnverified -> it.startActivity(Intent(it, ConnectIdentityVerificationActivity::class.java))
            //    isUserNewUser -> it.startActivity(Intent(it, ConnectIdentityVerificationActivity::class.java))
            // }
            connectOTPSuccess.value = true
        }
    }

    private fun onConnectOTPError() {
        // TODO: Provide observable to show error on view
    }
}

