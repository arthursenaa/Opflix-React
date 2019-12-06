import React, { Component } from "react";

class Mapa extends Component {

    mapa = () => {
        let google = "http://maps.google.com/maps/api/js?sensor=false"

        fetch("http://192.168.6.115:5000/api/localization")
            .then(res => res.json())
            .then(data => montarMapa(data))
            .catch(error => console.log(error));

        function montarMapa(itens) {
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 10,
                center: new google.maps.LatLng(-23.5345442, -46.6493879),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < itens.length; i++) {
                console.log(itens[i].latitude);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        itens[i].latitude,
                        itens[i].longitude
                    ),
                    map: map
                });

                google.maps.event.addListener(
                    marker,
                    "click",
                    (function (marker, i) {
                        return function () {
                            infowindow.setContent(itens[i].id);
                            infowindow.open(map, marker);
                        };
                    })(marker, i)
                );
            }
        }
    }

    render() {
        return (
            <div id="map">
                
            </div>
        );
    }
}

export default Mapa;