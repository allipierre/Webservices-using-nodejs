chartjs = new Chart(document.getElementById("chartjs-4"), {
    "type": "doughnut",
    "data": {
        "labels": graph_label,
        "datasets": [{
            "label": "My First Dataset",
            "data": graph_data,
            "backgroundColor": ["rgb(35, 123, 177)", "rgb(104, 193, 130)", "rgb(250, 213, 92)","rgb(237, 102, 71)","rgb(133, 97, 200)","rgb(255, 159, 64)"]
        }]
    }
});
