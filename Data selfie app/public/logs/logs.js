//on  index.html of logs for Selfie data option 
//this function appending div elements on the page displaying selfies and details
getData();

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  for (item of data) {
    const root = document.createElement("div");
    const mood = document.createElement("div");
    const geo = document.createElement("div");
    const date = document.createElement("div");
    const image = document.createElement('img');


    mood.textContent = `mood: ${item.mood}`;
    geo.textContent = `${item.lat}°, ${item.lon}°`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = item.image64;

    root.append(mood, geo, date,image);
   
    document.body.append(root);
  }
  console.log(data);
}
