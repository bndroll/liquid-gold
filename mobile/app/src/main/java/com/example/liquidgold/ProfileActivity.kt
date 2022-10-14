package com.example.liquidgold

import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.liquidgold.dto.getReadableRating
import com.example.liquidgold.services.getInfo
import java.net.URL


class ProfileActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val fioView = findViewById<TextView>(R.id.profile_name)
        val ratingView = findViewById<TextView>(R.id.rating)

        getInfo(this).subscribe {
            fioView.text = it.fio
            ratingView.text = getReadableRating(it.rating)
        }
    }
}