package com.example.liquidgold

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.yandex.mapkit.Animation
import com.yandex.mapkit.MapKitFactory
import com.yandex.mapkit.RequestPoint
import com.yandex.mapkit.RequestPointType
import com.yandex.mapkit.directions.DirectionsFactory
import com.yandex.mapkit.directions.driving.*
import com.yandex.mapkit.geometry.Point
import com.yandex.mapkit.map.CameraPosition
import com.yandex.mapkit.map.MapObjectCollection
import com.yandex.mapkit.mapview.MapView


class MapActivity : AppCompatActivity(), DrivingSession.DrivingRouteListener{
    lateinit var mapView: MapView
    lateinit var mapObjects: MapObjectCollection

    lateinit var drivingRouter: DrivingRouter
    lateinit var drivingSession: DrivingSession

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        MapKitFactory.setApiKey("_")
        MapKitFactory.initialize(this)

        setContentView(R.layout.activity_map_acitivity)

        mapView = findViewById(R.id.mapview)
        mapView.map.move(
             CameraPosition(Point(59.945933, 30.320045), 14.2f, 0.0f, 0.0f),
             Animation(Animation.Type.SMOOTH, 2F),
             null
        )

        mapObjects = mapView.map.mapObjects.addCollection()
        drivingRouter = DirectionsFactory.getInstance().createDrivingRouter()

        mapView.map.mapObjects.addPlacemark(Point(59.9382409, 30.3257298))
        mapView.map.mapObjects.addPlacemark(Point(59.961034, 30.3307573))

        submitRequest()
    }

    private fun submitRequest() {
        val drivingOptions = DrivingOptions()
        val vehicleOptions = VehicleOptions()

        drivingOptions.routesCount = 1
        val requestPoints: ArrayList<RequestPoint> = ArrayList()
        requestPoints.add(
            RequestPoint(
                Point(59.9382409, 30.3257298),
                RequestPointType.WAYPOINT,
                null
            )
        )
        requestPoints.add(
            RequestPoint(
                Point(59.961034, 30.3307573),
                RequestPointType.WAYPOINT,
                null
            )
        )
        drivingSession =
            drivingRouter.requestRoutes(requestPoints, drivingOptions, vehicleOptions, this)
    }

    override fun onDrivingRoutes(routes: List<DrivingRoute>) {
        for (route in routes) {
            mapObjects.addPolyline(route.geometry)
        }
    }

    override fun onDrivingRoutesError(p0: com.yandex.runtime.Error) {
        Toast.makeText(this, "Что-то пошло не так", Toast.LENGTH_SHORT).show()
    }

    override fun onStart() {
        super.onStart()
        MapKitFactory.getInstance().onStart()
        mapView.onStart()
    }

    override fun onStop() {
        super.onStop()
        MapKitFactory.getInstance().onStop()
        mapView.onStop()
    }
}