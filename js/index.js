/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        document.getElementById('encode').addEventListener('click', this.encode, false);
        document.getElementById('whitelist').addEventListener('click', this.whitelist, false);
        document.getElementById('camera').addEventListener('click', this.camera, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        window.addEventListener('batterystatus', app.onBatteryStatus, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    onBatteryStatus: function() {
        alert("Level: " + info.level + " isPlugged: " + info.isPlugged);
    },
    scan: function() {
        console.log('scanning');
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            scanner.scan( function (result) { 

                alert("We got a barcode\n" + 
                "Result: " + result.text + "\n" + 
                "Format: " + result.format + "\n" + 
                "Cancelled: " + result.cancelled);  

               console.log("Scanner result: \n" +
                    "text: " + result.text + "\n" +
                    "format: " + result.format + "\n" +
                    "cancelled: " + result.cancelled + "\n");
                document.getElementById("info").innerHTML = result.text;
                console.log(result);
                /*
                if (args.format == "QR_CODE") {
                    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                }
                */

            }, function (error) { 
                console.log("Scanning failed: ", error); 
            } );
    },

    encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    },

    whitelist: function() {

        app.xhr("https://tv.eurosport.com/", function(xhr) {
            console.log("eurosport is invalid " + xhr.status);
            console.log("eurosport: " + xhr.responseText.substring(0, 100));
        });
        /*
        app.xhr("http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js", function(xhr) {
            console.log("googleapis: should succeed: " + xhr.status);
            console.log("googleapis: " + xhr.responseText.substring(0, 100));
        });

        app.xhr("http://code.jquery.com/jquery-1.10.2.min.js", function(xhr) {
            console.log("jquery: should fail: " + xhr.status);
            console.log("jquery: " + xhr.responseText.substring(0, 100));
        });

        app.xhr("http://phonegap.com", function(xhr) {
            console.log("phonegap: should fail: " + xhr.status);
            console.log("phonegap: " + xhr.responseText.substring(0, 100));
        });

        app.xhr("http://googleapis.com", function(xhr) {
            console.log("googleapis.com: should succeed: " + xhr.status);
            console.log("googleapis.com: " + xhr.responseText.substring(0, 100));
        });

        app.xhr("http://jquery.com", function(xhr) {
            console.log("jquery.com: should succeed: " + xhr.status);
            console.log("jquery.com: " + xhr.responseText.substring(0, 100));
        });
        */

    },

    camera: function() {

        function onSuccess(imageData) {
            console.log('success');
        }

        function onFail(message) {
            console.log('failed');
        }

        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

    },

    xhr: function(url, cb) {
        var xhr1 = new XMLHttpRequest();
        xhr1.onreadystatechange = function(args) {
            if(xhr1.readyState==4)
                cb(xhr1);
        };
        xhr1.open("GET", url, true);
        xhr1.send();
    }

};
