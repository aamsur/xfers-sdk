package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.Bank

class BanksViewModel : ViewModel() {
    private val banks = MutableLiveData<List<Bank>>()

    fun getBanks(): LiveData<List<Bank>> {
        loadBanks()
        return banks
    }

    private fun loadBanks() {
        // TODO: Modify to an asynchronous operation to fetch supported banks

        banks.postValue(listOf(
                Bank("Bank BCA"),
                Bank("Bank Mandiri"),
                Bank("Bank BRI"),
                Bank("Bank BNI"),
                Bank("Bank CIMB Niaga"),
                Bank("Bank Permata")
        ))
    }
}
