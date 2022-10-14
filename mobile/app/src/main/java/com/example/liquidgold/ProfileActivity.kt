package com.example.liquidgold

import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.liquidgold.services.getInfo
import java.net.URL


class ProfileActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val textView = findViewById<TextView>(R.id.profile_name)

        getInfo().subscribe {
            textView.text = it.name
        }
    }
}