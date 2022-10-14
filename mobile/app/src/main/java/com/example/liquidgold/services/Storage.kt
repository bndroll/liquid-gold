package com.example.liquidgold.services

import android.app.Activity
import android.content.Context
import com.example.liquidgold.R

const val PREFERENCE = "pr"
const val AUTH_KEY = "auth_token"

var appToken = ""

fun clearAuthToken(activity: Activity) {
    appToken = ""
    setAuthToken(activity, "")
}


fun setAuthToken(activity: Activity, token: String) {
    val pref = activity.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE)
    appToken = token
    with( pref.edit() ) {
        putString(AUTH_KEY, token)
        apply()
    }
}

fun getAuthToken(activity: Activity): String? {
    if (appToken.isNotEmpty()) {
        return appToken
    }

    var token = activity.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE).getString(AUTH_KEY, "")
    if (token == null || token.isEmpty()) {
        token = ""
    }

    appToken = token

    return token
}

fun hasToken(activity: Activity): Boolean {
    if (appToken.isNotEmpty()) {
        return true
    }

    val token = getAuthToken(activity) ?: return false;

    return token.isNotEmpty();
}
