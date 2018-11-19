package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.Charge
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers
import java.math.BigDecimal

class CreateChargeViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    val createChargeSuccess = MutableLiveData<Charge>()
    private var subscription: Disposable? = null

    fun createCharge(amount: BigDecimal, orderId: String, description: String, debitOnly: String): LiveData<Charge> {
        subscription = xfersRepository.createCharge(amount, orderId, description, debitOnly)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onCreateChargeStart() }
                .doOnTerminate { onCreateChargeFinish() }
                .subscribe(
                        { onCreateChargeSuccess(it) },
                        { onCreateChargeError() }
                )

        return createChargeSuccess
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
        createChargeSuccess.postValue(charge)
        // TODO: Provide observable to show success on view
    }

    private fun onCreateChargeError() {
        // TODO: Provide observable to show error on view
    }
}