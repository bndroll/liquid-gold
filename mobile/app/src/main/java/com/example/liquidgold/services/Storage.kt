package com.example.liquidgold.services

import android.app.Activity
import android.content.Context
import com.example.liquidgold.R

const val PREFERENCE = "pr"
const val AUTH_KEY = "auth_token"
val token = ""

fun saveToSharedPreferences() {}

fun getAuthToken(activity: Activity): String? {
    return activity.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE).getString(AUTH_KEY, "")
}

fun hasToken(activity: Activity): Boolean {
    val token = getAuthToken(activity) ?: return false;

    return token.isNotEmpty();
}
