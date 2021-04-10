function setup() {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320, 240);
  const button = document.getElementById("submit");
  button.addEventListener("click", async (event) => {
    const mood = document.getElementById("mood").value;
    //capturing image from video 
    video.loadPixels();
    //converting that image into base 64 code
    const image64 = video.canvas.toDataURL();
   
    const data = { lat, lon, mood, image64 };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),

    };
    const response = await fetch("/api", options);
    const json = await response.json();
    console.log(json);
  });
  
//checking for geolocation,if users allow it displays coordinates
  if ("geolocation" in navigator) {
    console.log("geolocation is available");
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;
      console.log(lat, lon);
    });
  } else {
    console.log("geolocation is not available");
  }
  
}
