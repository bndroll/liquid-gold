package com.example.liquidgold

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.liquidgold.services.*
import com.google.android.material.textfield.TextInputEditText


class AuthActivity : AppCompatActivity() {
    private val TAG = "AUTH_ACTIVITY"
    private lateinit var loginInput: TextInputEditText
    private lateinit var passwordInput: TextInputEditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auth)

//        clearAuthToken(this)
        checkLogin()

        loginInput = findViewById(R.id.loginInput)
        passwordInput = findViewById(R.id.passwordInput)

        findViewById<Button>(R.id.loginButton).setOnClickListener {
            login(
                loginInput.text.toString(),
                passwordInput.text.toString()
            ).subscribe {
                setAuthToken(this, it)
                checkLogin()
            }
        }
    }

    private fun checkLogin() {
        Log.e(TAG, "Auth check login")
        if (!hasToken(this)) {
            return
        }

        val intent = Intent(this, ProfileActivity::class.java)
        startActivity(intent)
    }
}