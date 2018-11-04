package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.UserBankAccount

class UserBankAccountsViewModel : ViewModel() {
    private val userBankAccounts = MutableLiveData<List<UserBankAccount>>()

    fun getUserBankAccounts(): LiveData<List<UserBankAccount>> {
        loadUserBankAccounts()
        return userBankAccounts
    }

    private fun loadUserBankAccounts() {
        // TODO: Modify to an asynchronous operation to fetch userBankAccounts
        val userBankAccountIpsum = UserBankAccount("DBS", "123-XXXXX-3")

        userBankAccounts.postValue(listOf(userBankAccountIpsum, userBankAccountIpsum))
    }
}
