package com.example.liquidgold

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import android.widget.Button
import com.example.liquidgold.services.getAuthToken
import com.example.liquidgold.services.hasToken
import com.example.liquidgold.services.login
import com.google.android.material.textfield.TextInputEditText

class AuthActivity : AppCompatActivity() {
    private val TAG = "AUTH_ACTIVITY"
    private lateinit var loginInput: TextInputEditText
    private lateinit var passwordInput: TextInputEditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auth)

        checkLogin()

        loginInput = findViewById(R.id.loginInput)
        passwordInput = findViewById(R.id.passwordInput)

        findViewById<Button>(R.id.loginButton).setOnClickListener {
            login(
                loginInput.text.toString(),
                passwordInput.text.toString()
            ).subscribe {
                Log.e(TAG, it)
            }
        }
    }

    private fun checkLogin() {
        Log.e(TAG, "Auth check login")
        if (!hasToken(this)) {
            return
        }

        Log.e(TAG, getAuthToken(this) + " token")
    }
}