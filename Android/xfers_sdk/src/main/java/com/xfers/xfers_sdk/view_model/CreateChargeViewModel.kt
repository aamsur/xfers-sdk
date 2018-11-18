package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.Charge
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers
import java.math.BigInteger

class CreateChargeViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val chargeSuccess = MutableLiveData<Charge>()
    private var subscription: Disposable? = null

    fun getCharge(amount: BigInteger, order_id: String, debit_only: String): LiveData<Charge> {
        subscription = xfersRepository.createCharge(amount, order_id, debit_only)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onCreateChargeStart() }
                .doOnTerminate { onCreateChargeFinish() }
                .subscribe(
                        { onCreateChargeSuccess(it) },
                        { onCreateChargeError() }
                )

        return chargeSuccess
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onCreateChargeStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onCreateChargeFinish() {
        // TODO: Provide observable to show
    }

    private fun onCreateChargeSuccess(charge: Charge) {
        chargeSuccess.postValue(charge)
        // TODO: Provide observable to show success on view
    }

    private fun onCreateChargeError() {
        // TODO: Provide observable to show error on view
    }
}